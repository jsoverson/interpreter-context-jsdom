"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
describe('dom context', () => {
    it('needs more tests', () => {
        // This is a quick module that was extracted from another project.
        // It needs tests, feel free to add them. This one is not a good example.
        const ctx = src_1.domcontext();
        chai_1.expect(new ctx.Array(10).length).to.equal(10);
    });
});
//# sourceMappingURL=index.test.js.map