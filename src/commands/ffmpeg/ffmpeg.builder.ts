export class FFMPEGBuilder {
    private inputPath: string;
    private options = new Map<string, string>();

    constructor() {
        this.options.set('-c:v', 'libx264');
    }

    input(inputPath: string) {
        this.inputPath = inputPath;
        return this;
    }

    output(outputPath: string) {
        if (!this.inputPath) {
            throw new Error(`Input not exist`);
        }

        const args = ['-i', this.inputPath];

        this.options.forEach((el, key) => {
            args.push(key);
            args.push(el);
        });

        args.push(outputPath);

        return args;
    }

    setVideoSize(width: number, height: number) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }

}

