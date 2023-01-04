import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  readFile,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
jest.setTimeout(60 * 1000);
describe('gin e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject('@nx-golang/gin', 'dist/packages/gin');
  });
  it('should create an gin application', async () => {
    const appName = uniq('app');
    await runNxCommandAsync(`generate @nx-golang/gin:application ${appName}`);
    expect(() => checkFilesExist(`apps/${appName}/main.go`));
    expect(() => checkFilesExist(`apps/${appName}/go.mod`));
    expect(() => checkFilesExist(`apps/${appName}/go.work`));
    expect(readFile(`apps/${appName}/go.mod`)).toContain(appName);

    const resultBuild = await runNxCommandAsync(`build ${appName}`);
    expect(resultBuild.stdout).toContain(`Executing command: go build`);

    // const resultServe = await runNxCommandAsync(`serve ${appName}`);
    // expect(resultServe.stdout).toContain(`Executing command: go run main.go`);

    const resultTest = await runNxCommandAsync(`test ${appName}`);
    expect(resultTest.stdout).toContain(
      `Executing command: go test -v ./... -cover -race`
    );

    const resultTestSkip = await runNxCommandAsync(
      `test ${appName} --skip-cover --skip-race`
    );
    expect(resultTestSkip.stdout).toContain(
      `Executing command: go test -v ./...`
    );
    expect(resultTestSkip.stdout).not.toContain(` -cover -race `);

    const resultLint = await runNxCommandAsync(`lint ${appName}`);
    expect(resultLint.stdout).toContain(
      `Successfully ran target lint for project ${appName}`
    );
  });
  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    runNxCommandAsync('reset');
  });
});
