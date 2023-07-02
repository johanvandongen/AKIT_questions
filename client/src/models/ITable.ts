export interface ITable {
    _id: string;
    author: string;
    date: string;
    issue: string;
    exerciseIds: string[];
    screenshot: any;
    question: string;
    chapter: string;
    treated: {
        state: string;
        remark: string;
    };
    answer: string;
    authorReply: string;
}
