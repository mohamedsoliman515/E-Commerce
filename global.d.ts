// handle css module to TS as string
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
