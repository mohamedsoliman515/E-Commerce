// handle css module to TS as string
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";