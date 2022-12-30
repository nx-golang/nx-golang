import { Tree } from '@nrwl/devkit';
import { join } from 'path';
import { execSync } from 'child_process';

const MODULES_REGEX = /use\s+\((?<modules>[^)]*)\)/g;

const GO_MOD_FILE = 'go.mod';
const GO_WORK_FILE = 'go.work';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createGoMod(tree: Tree, { projectRoot }: any) {
  const filePath = join(projectRoot, GO_MOD_FILE);
  const moduleName = projectRoot;

  if (!tree.exists(filePath)) {
    tree.write(filePath, `module ${moduleName}\n`);
  }
}

function updateGoWorkUses(fileContent: string, newProject: string): string {
  const execResult = MODULES_REGEX.exec(fileContent);

  let modules: string[];
  if (execResult) {
    const groups = execResult.groups;
    modules = [
      ...new Set([...groups['modules'].split(/(\s+)/), newProject]),
    ].sort();
  } else {
    modules = [newProject];
  }

  const formattedModules = modules.reduce((ac, m) => {
    const moduleName = m.trim();
    return moduleName.length ? `${ac}\t${moduleName}\n` : ac;
  }, '');
  return fileContent.replace(MODULES_REGEX, `use (\n${formattedModules})`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateGoWork(tree: Tree, options: any) {
  if (!tree.exists(GO_WORK_FILE)) {
    if (!canUseGoWork()) {
      throw new Error('Your version of go does not support workspaces');
    }

    const [major, minor] = getGoVersion().split('.');

    tree.write(
      GO_WORK_FILE,
      `go ${major}.${minor}\n\nuse (\n    ${options.projectRoot}\n)\n`
    );
    return;
  }

  const fileContent = tree.read(GO_WORK_FILE).toString();
  const newFileContent = updateGoWorkUses(fileContent, options.projectRoot);
  tree.write(GO_WORK_FILE, newFileContent);
}

const GO_VERSION_REGEX = /go(?<version>\S+) /;

export function getGoVersion() {
  const output = execSync('go version');
  if (output) {
    return GO_VERSION_REGEX.exec(output.toString()).groups.version;
  } else {
    throw new Error('Fail to retrieve Go version');
  }
}

function versionAsNum(version: string | undefined) {
  return parseInt(version) || 0;
}

export function isVersionAfter(version: string, refVersion: string) {
  const [sMajor, sMinor, sPatch] = version.split('.');
  const [sRefMajor, sRefMinor, sRefPatch] = refVersion.split('.');

  const major = versionAsNum(sMajor);
  const refMajor = versionAsNum(sRefMajor);

  if (major != refMajor) {
    return major > refMajor;
  }

  const minor = versionAsNum(sMinor);
  const refMinor = versionAsNum(sRefMinor);

  if (minor != refMinor) {
    return minor > refMinor;
  }

  const patch = versionAsNum(sPatch);
  const refPatch = versionAsNum(sRefPatch);

  return patch >= refPatch;
}

function canUseGoWork() {
  const version = getGoVersion();
  return isVersionAfter(version, '1.18');
}
