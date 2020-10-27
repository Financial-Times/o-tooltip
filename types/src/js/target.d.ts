export default Target;
declare class Target {
    constructor(targetEl: any);
    targetEl: any;
    get offsetTop(): any;
    get left(): any;
    get right(): any;
    get top(): any;
    get bottom(): any;
    get width(): any;
    get height(): any;
    get centrePoint(): {
        x: any;
        y: any;
    };
}
