class HomePage {
    public get span1() { return browser.element(".metvn"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
