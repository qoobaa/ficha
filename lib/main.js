spade.require("sproutcore");
spade.require("sproutcore-datastore");

Ficha = SC.Application.create({
    store: SC.Store.create().from("Ficha.FixturesDataSource")
});

Ficha.store.commitRecordsAutomatically = true;

Ficha.FixturesDataSource = SC.FixturesDataSource.extend();

Ficha.Card = SC.Record.extend({
    primaryKey: "id",

    front: SC.Record.attr(String),
    back: SC.Record.attr(String),

    category: SC.Record.toOne("Ficha.Category", {
        inverse: "cards",
        isMaster: true,
        key: "category_id"
    })
});

Ficha.Category = SC.Record.extend({
    primaryKey: "id",

    name: SC.Record.attr(String),

    cards: SC.Record.toMany("Ficha.Card", {
        inverse: "group",
        isMaster: false
    })
});

Ficha.categoriesController = SC.ArrayController.create({

});

Ficha.cardsController = SC.ArrayController.create({
    content: [],

    deleteCard: function (content) {
        this.removeObject(content.get("content"));
    }
});

Ficha.newCardController = SC.Object.create({
    isValid: function () {
        return this.get("front") !== "" && this.get("back") !== "";
    }.property("front", "back"),

    init: function () {
        this.reset();
    },

    reset: function () {
        this.setProperties({ front: "", back: "" });
    },

    create: function () {
        if (this.get("isValid")) {
            var card = Ficha.store.createRecord(Ficha.Card, {
                front: this.get("front"),
                back: this.get("back")
            });

            Ficha.cardsController.pushObject(card);
            this.reset();
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
        Ficha.newCardController.create();
        SC.run.sync();
        this.$("input[type='text'][value='']:first").focus();
    }
});
