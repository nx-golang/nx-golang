import { ExecutorContext } from '@nrwl/devkit';
import path = require('path');
import { runGoCommand } from '../../util';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const mainFile = `${options.main}`;
  const output = `-o ${options.outputPath}${
    process.platform === 'win32' ? '.exe' : ''
  }`;
  const projectName = context.projectName
  const sourceRoot = context.workspace.projects[projectName].sourceRoot;
  // get deps
  runGoCommand(context, 'mod', ['tidy'], {
    cwd: path.join(context.cwd, sourceRoot),
  });
  runGoCommand(context, 'mod', ['vendor'], {
    cwd: path.join(context.cwd, sourceRoot),
  });
  return runGoCommand(context, 'build', [output, mainFile]);
}
