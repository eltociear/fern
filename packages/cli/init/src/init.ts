import { AbsoluteFilePath, cwd, doesPathExist, join, RelativeFilePath } from "@fern-api/core-utils";
import { FERN_DIRECTORY, ProjectConfigSchema, PROJECT_CONFIG_FILENAME } from "@fern-api/project-configuration";
import { TaskContext } from "@fern-api/task-context";
import { mkdir, writeFile } from "fs/promises";
import { createWorkspace } from "./createWorkspace";

export async function initialize({
    organization,
    versionOfCli,
    context,
}: {
    organization: string;
    versionOfCli: string;
    context: TaskContext;
}): Promise<void> {
    const pathToFernDirectory = join(AbsoluteFilePath.of(process.cwd()), RelativeFilePath.of(FERN_DIRECTORY));
    if (await doesPathExist(pathToFernDirectory)) {
        context.fail("Directory already exists: " + pathToFernDirectory);
        return;
    }

    const fernDirectory = join(cwd(), RelativeFilePath.of(FERN_DIRECTORY));
    await mkdir(FERN_DIRECTORY);
    await writeProjectConfig({
        filepath: join(fernDirectory, RelativeFilePath.of(PROJECT_CONFIG_FILENAME)),
        organization,
        versionOfCli,
    });
    await createWorkspace({
        directoryOfWorkspace: join(fernDirectory, RelativeFilePath.of("api")),
    });
}

async function writeProjectConfig({
    organization,
    filepath,
    versionOfCli,
}: {
    organization: string;
    filepath: AbsoluteFilePath;
    versionOfCli: string;
}): Promise<void> {
    const projectConfig: ProjectConfigSchema = {
        organization,
        version: versionOfCli,
    };
    await writeFile(filepath, JSON.stringify(projectConfig, undefined, 4));
}