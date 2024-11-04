import {IStreamLogger} from "../handlers/stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "node:child_process";
import {ICommandExec} from "./command.types";

export abstract class CommandExecutor<Input> {

     constructor(private logger: IStreamLogger) {

     }

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): ICommandExec;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    abstract processTrim(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processTrim(stream, this.logger);
    }


 }