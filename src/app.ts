import {PromptService} from "./core/prompt/prompt.service";

export class App {
    async run() {
        const result = await (new PromptService()).input<number>('Number', 'number');
    }
}

const app = new App();
app.run();