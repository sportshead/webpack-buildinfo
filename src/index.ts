import execa from "execa";
import { getOptions } from "loader-utils";
import webpack from "webpack";
import os from "os";

export default function loader(this: webpack.loader.LoaderContext) {
    const defaultOptions = {
        esModule: true,
        gitHash: false,
        gitHashShort: false,
        time: false,
        platform: false,
        arch: false,
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
    };
    const options = Object.assign({}, defaultOptions, getOptions(this));

    const callback = this.async()!;

    const output: BuildInfo = {};

    if (options.gitHash) {
        output.gitHash = execa.sync("git", ["rev-parse", "HEAD"]).stdout.trim();
    }
    if (options.gitHashShort) {
        output.gitHashShort = execa
            .sync("git", ["rev-parse", "--short", "HEAD"])
            .stdout.trim();
    }
    if (options.time) {
        output.time = Date.now();
    }
    if (options.platform) {
        output.platform = os.platform();
    }
    if (options.arch) {
        output.arch = os.arch();
    }
    if (options.cpus) {
        output.cpus = os.cpus();
    }
    if (options.hostname) {
        output.hostname = os.hostname();
    }
    if (options.networkInterfaces) {
        output.networkInterfaces = os.networkInterfaces();
    }
    if (options.freemem) {
        output.freemem = os.freemem();
    }
    if (options.totalmem) {
        output.totalmem = os.totalmem();
    }
    if (options.userInfo) {
        output.userInfo = os.userInfo();
    }
    if (options.webpackVersion) {
        output.webpackVersion = webpack.version;
    }
    if (options.nodeVersion) {
        output.nodeVersion = process.versions.node;
    }
    if (options.npmVersion) {
        output.npmVersion = execa.sync("npm", ["--version"]).stdout.trim();
    }
    if (options.yarnVersion) {
        output.yarnVersion = execa.sync("yarn", ["--version"]).stdout.trim();
    }
    if (options.argv) {
        output.argv = process.argv;
    }

    callback(
        null,
        `${
            options.esModule ? "export default" : "module.exports ="
        } ${JSON.stringify(output)}`
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
