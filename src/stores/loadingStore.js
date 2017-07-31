import { observable, action } from "mobx";

class Loading {
    @observable isLoading = false;

    @action changeLoadingStatusFalse() {
        this.isLoading = false;
    }

    @action changeLoadingStatusTrue() {
        this.isLoading = true;
    }
}

const loadingStore = new Loading();
export default loadingStore;