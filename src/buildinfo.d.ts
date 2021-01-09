import type { BuildInfo } from "./index";
declare module "!webpack-plugin-buildinfo?*" {
    const buildinfo: BuildInfo;
    export default buildinfo;
}
