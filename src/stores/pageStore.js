import { observable } from "mobx";

class Page {
    @observable page = 1;
}

const PageNumber = new Page();
export default PageNumber;