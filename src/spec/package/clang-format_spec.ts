import {expect} from 'chai';
import {clangFormat, editorConfig, vscodeSettings} from './helpers';

describe('Clang Format', () => {

  it('should have same indent size as editor configs', () => {
    const clangFormatIndentWidthRE = /^IndentWidth: +([0-9]+)/m;
    expect(clangFormat).to.match(clangFormatIndentWidthRE);
    const clangFormatIndentWidth =
        parseInt(clangFormat.match(clangFormatIndentWidthRE)![1]);

    const editorConfigIndentSizeRE = /^indent_size += +([0-9]+)/m;
    expect(editorConfig).to.match(editorConfigIndentSizeRE);
    const editorConfigIndentSize =
        parseInt(editorConfig.match(editorConfigIndentSizeRE)![1]);
    const vscodeEditorTabSize = vscodeSettings['editor.tabSize'];

    expect(editorConfigIndentSize).to.equal(clangFormatIndentWidth);
    expect(vscodeEditorTabSize).to.equal(clangFormatIndentWidth);
  });
});
