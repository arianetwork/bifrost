import * as Chai from "chai";
import { XHTMLIM } from "../../src/xmppjs/XHTMLIM";
import { assertXML } from "./util";

const expect = Chai.expect;

describe("XHTMLIM", () => {
    it("should not change compliant messages", () => {
        expect(
            XHTMLIM.HTMLToXHTML(
                "<html xmlns='http://jabber.org/protocol/xhtml-im'><body xmlns='http://www.w3.org/1999/xhtml'><p>Hello world</p></body></html>",
            ),
        ).to.equal(
            "<html xmlns='http://jabber.org/protocol/xhtml-im'><body xmlns='http://www.w3.org/1999/xhtml'><p>Hello world</p></body></html>",
        );
    });
    it("should transform a simple text message", () => {
        expect(
            XHTMLIM.HTMLToXHTML(
                "o/",
            ),
        ).to.equal(
            "<html xmlns='http://jabber.org/protocol/xhtml-im'><body xmlns='http://www.w3.org/1999/xhtml'>o/</body></html>",
        );
    });
    it("should transform a message with a link", () => {
        expect(
            XHTMLIM.HTMLToXHTML(
                "<a href=\"https://matrix.to/#/@bob:matrix.org\">bob</a>: Huzzah!",
            ),
        ).to.equal(
            "<html xmlns=\'http://jabber.org/protocol/xhtml-im\'><body xmlns='http://www.w3.org/1999/xhtml'><a href=\'https://matrix.to/#/@bob:matrix.org\'>"
            + "bob</a>: Huzzah!</body></html>",
        );
    });
    it("should transform a message with a reply", () => {
        expect(
            XHTMLIM.HTMLToXHTML(
                "<mx-reply><blockquote><a href=\"https://matrix.to/#/!ruaviCwHdJSWfKcBam:half-shot.uk/"
                + "$1548685877554RlePg:half-shot.uk?via=half-shot.uk&via=matrix.org&via=t2bot.io\">In reply to</a>"
                + "<a href=\"https://matrix.to/#/@Half-Shot:half-shot.uk\">"
                + "@Half-Shot:half-shot.uk</a><br>This is the first message</blockquote></mx-reply>"
                + "And this is a reply",
            ),
        ).to.equal(
            "<html xmlns='http://jabber.org/protocol/xhtml-im'><body xmlns='http://www.w3.org/1999/xhtml'>"
            + "<blockquote><a href='https://matrix.to/#/!ruaviCwHdJSWfKcBam:half-shot.uk/$1548685877554RlePg:half-shot.uk?via=half-shot.uk&amp"
            + ";via=matrix.org&amp;via=t2bot.io'>In reply to</a><a href='https://matrix.to/#/@Half-Shot:half-shot.uk'>@Half-Shot:half-shot.uk</a>"
            + "<br>This is the first message</br></blockquote>And this is a reply</body></html>",
        );
    });
    //
    it("should transform an inline image", () => {
        const xhtmlValue = XHTMLIM.HTMLToXHTML("Here is a pretty image<span class=\"d-emoji\"><img alt=\"shadow\" title=\"shadow\" height=\"32\" src=\"http://foobar.com\" /></span>");
        assertXML(xhtmlValue);
        expect(xhtmlValue).to.equal("<html xmlns='http://jabber.org/protocol/xhtml-im'><body xmlns='http://www.w3.org/1999/xhtml'>Here is a pretty image<span class='d-emoji'>" +
            "<img alt='shadow' title='shadow' height='32' src='http://foobar.com'></img></span></body></html>");
    })
});
