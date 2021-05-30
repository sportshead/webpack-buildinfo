import execa from "execa";
import { getOptions } from "loader-utils";
import webpack from "webpack";
import os from "os";

export default function loader(
    this: webpack.loader.LoaderContext & {
        getLogger: (pluginName: string) => webpack.Logger;
    }
) {
    const logger = this.getLogger("webpack-plugin-buildinfo");

    const defaultOptions = {
        esModule: true,
        gitHash: false,
        gitHashShort: false,
        time: false,
        platform: false,
        arch: false,
        cpus: false,
        hostname: false,
        freemem: false,
        totalmem: false,
        userInfo: false,
        networkInterfaces: false,
        webpackVersion: false,
        nodeVersion: false,
        npmVersion: false,
        yarnVersion: false,
        argv: false,
        all: false,
    };
    const options = Object.assign({}, defaultOptions, getOptions(this));

    logger.debug(`rootContext: ${this.rootContext}`);
    logger.log(`Options: ${options}`);

    const callback = this.async()!;

    const output: BuildInfo = {};

    if (options.gitHash || options.all) {
        logger.debug("Including git hash in output object");
        output.gitHash = execa.sync("git", ["rev-parse", "HEAD"]).stdout.trim();
    }
    if (options.gitHashShort || options.all) {
        logger.debug("Including short git hash in output object");
        output.gitHashShort = execa
            .sync("git", ["rev-parse", "--short", "HEAD"])
            .stdout.trim();
    }
    if (options.time || options.all) {
        logger.debug("Including time in output object");
        output.time = Date.now();
    }
    if (options.platform || options.all) {
        logger.debug("Including platform in output object");
        output.platform = os.platform();
    }
    if (options.arch || options.all) {
        logger.debug("Including platform arch in output object");
        output.arch = os.arch();
    }
    if (options.cpus || options.all) {
        logger.debug("Including cpus in output object");
        output.cpus = os.cpus();
    }
    if (options.hostname || options.all) {
        this.emitWarning(
            new Error(
                "Your hostname is being built into the program. This may include sensitive data."
            )
        );
        logger.debug("Including hostname in output object");
        output.hostname = os.hostname();
    }
    if (options.networkInterfaces || options.all) {
        this.emitWarning(
            new Error(
                "Information about your network interfaces is being built into the program. This may include sensitive data."
            )
        );
        logger.debug("Including network interfaces in output object");
        output.networkInterfaces = os.networkInterfaces();
    }
    if (options.freemem || options.all) {
        logger.debug("Including free memory in output object");
        output.freemem = os.freemem();
    }
    if (options.totalmem || options.all) {
        logger.debug("Including total memory in output object");
        output.totalmem = os.totalmem();
    }
    if (options.userInfo || options.all) {
        this.emitWarning(
            new Error(
                "Your user information is being built into the program. This may include sensitive data."
            )
        );
        logger.debug("Including user info in output object");
        output.userInfo = os.userInfo();
    }
    if (options.webpackVersion || options.all) {
        logger.debug("Including webpack version in output object");
        output.webpackVersion = webpack.version;
    }
    if (options.nodeVersion || options.all) {
        logger.debug("Including node version in output object");
        output.nodeVersion = process.versions.node;
    }
    if (options.npmVersion || options.all) {
        logger.debug("Including npm version in output object");
        output.npmVersion = execa.sync("npm", ["--version"]).stdout.trim();
    }
    if (options.yarnVersion || options.all) {
        logger.debug("Including yarn version in output object");
        output.yarnVersion = execa.sync("yarn", ["--version"]).stdout.trim();
    }
    if (options.argv || options.all) {
        logger.debug("Including process argv in output object");
        output.argv = process.argv;
    }

    callback(
        null,
        `${
            options.esModule ? "export default" : "module.exports ="
        } ${JSON.stringify(output)};`
    );
}

export interface BuildInfo {
    gitHash?: string;
    gitHashShort?: string;
    time?: number;
    platform?: NodeJS.Platform;
    arch?: string;
    cpus?: os.CpuInfo[];
    freemem?: number;
    totalmem?: number;
    hostname?: string;
    userInfo?: os.UserInfo<string>;
    networkInterfaces?: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
    webpackVersion?: string;
    nodeVersion?: string;
    npmVersion?: string;
    yarnVersion?: string;
    argv?: string[];
}
