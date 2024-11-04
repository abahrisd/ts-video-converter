import {ICommandExec} from "../../core/executor/command.types";

export interface IFFMPEGInput {
    width: number;
    height: number;
    path: string;
    name: string;
}

export interface ICommandExecFFMPEG extends ICommandExec {
    output: string;
}