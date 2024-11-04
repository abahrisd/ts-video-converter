import {CommandExecutor} from "../../core/executor/command.executor";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {FFMPEGBuilder} from "./ffmpeg.builder";
import {PromptService} from "../../core/prompt/prompt.service";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {ICommandExecFFMPEG, IFFMPEGInput} from "./ffmpeg.types";
import {FileService} from "../../core/files/file.service";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FFMPEGExecutor extends CommandExecutor<IFFMPEGInput> {
    private fileService = new FileService();
    private promptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    async prompt() {
        const path = await this.promptService.input<string>('Input path', 'input');
        const height = await this.promptService.input<number>('Height', 'number');
        const width = await this.promptService.input<number>('Width', 'number');
        const name = await this.promptService.input<string>('File name', 'input');

        return {
            width,
            height,
            path,
            name,
        }
    }

    build({ width, height, path, name }): ICommandExecFFMPEG {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = new FFMPEGBuilder()
            .input(path)
            .setVideoSize(width, height)
            .output(output);

        return {
            command: 'ffmpeg',
            args,
            output,
        }
    }

    spawn({output, command, args}: ICommandExecFFMPEG): ChildProcessWithoutNullStreams {
        this.fileService.deleteFile(output);
        return spawn(command, args);
    }

    processTrim(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}