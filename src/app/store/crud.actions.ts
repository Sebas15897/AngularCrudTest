export class getPost {
    static readonly type="[POST] get";
}

export class deletePost {
    static readonly type="[POST] remove";
    constructor(public payload: string){}
}

export class searchPost {
    static readonly type="[POST] search";
    constructor(public payload: string) {}
}