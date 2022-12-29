import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ApplicationGeneratorSchema } from './schema';

import { toPosixPath, createGoMod, updateGoWork } from '../../util';

interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ApplicationGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
  createGoMod(tree, options);
  updateGoWork(tree, options);
}

export default async function (
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(
    tree,
    options
  );
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@nx-golang/gin:build',
        options: {
          outputPath: toPosixPath,
        },
      },
      serve: {
        executor: '@nx-golang/gin:serve',
        options: {
          main: toPosixPath(
            path.join(normalizedOptions.projectRoot, 'main.go')
          ),
        },
      },
      test: {
        executor: '@nx-golang/gin:test',
      },
      lint: {
        executor: '@nx-golang/gin:lint',
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
