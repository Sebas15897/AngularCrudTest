export class getPost {
    static readonly type="[POST] get";
}

export class deletePost {
    static readonly type="[POST] remove";
    constructor(public payload: string){}
}