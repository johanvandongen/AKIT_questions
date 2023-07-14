export interface ITable {
    _id: string;
    author: string;
    date: string;
    issue: string;
    exerciseIds: string[];
    screenshot: string[];
    question: string;
    chapter: string;
    treated: {
        state: string;
        remark: string;
    };
    answer: IAnswer[];
    authorReply: IAnswer[];
}

export interface IAnswer {
    date: string;
    author: string;
    answer: string;
}
