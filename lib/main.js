spade.require("sproutcore");

Ficha = SC.Application.create();

Ficha.Card = SC.Object.extend({
    front: "",
    back: "",

    isValid: function () {
        return this.get("front") && this.get("back");
    }.property("front", "back")
});

Ficha.cardsController = SC.ArrayController.create({
    content: [],

    deleteCard: function (content) {
        this.removeObject(content.get("content"));
    }
});

Ficha.cardController = SC.Object.create({
    currentCard: null,

    init: function () {
        this.newCard();
    },

    newCard: function () {
        this.set("currentCard", Ficha.Card.create());
    },

    createCard: function () {
        var currentCard = this.get("currentCard");

        if (currentCard.get("isValid")) {
            Ficha.cardsController.pushObject(this.get("currentCard"));
            this.newCard();
        }
    }
});

Ficha.SideView = SC.TextField.extend({
    insertNewline: function () {
        this.get("parentView").sideViewInsertNewline();
    }
});

Ficha.CardView = SC.View.extend({
    templateName: "card",

    sideViewInsertNewline: function () {
        SC.RunLoop.begin();
        Ficha.cardController.createCard();
        SC.RunLoop.end();
        this.$("input[type='text'][value='']:first").focus();
    }
});
