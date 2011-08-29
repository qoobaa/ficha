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
    back: SC.Record.attr(String)
});

Ficha.Card.FIXTURES = [
    { id: "1", front: "flibbertigibbet", back: "a flighty or whimsical person, usually a young woman" },
    { id: "2", front: "surreptitious", back: "kept secret, esp. because it would not be approved of" },
    { id: "3", front: "abstruse", back: "difficult to understand; obscure" }
];

// controllers

Ficha.cardsController = SC.ArrayController.create({
    content: []
});

Ficha.cardController = SC.Object.create({

});

// views

Ficha.CardView = SC.View.extend({
    tagName: "li",
    templateName: "card",
    cardBinding: "content",
    classNames: ["card"]
});

Ficha.CardsView = SC.CollectionView.extend({
    tagName: "ul",
    contentBinding: "Ficha.cardsController.content",
    itemViewClass: Ficha.CardView
});

Ficha.NewCardView = SC.View.extend({
    tagName: "li",
    templateName: "card-new",
    classNames: ["card-new", "card"]
});

Ficha.CardSideTextAreaView = SC.TextArea.extend({
    classNames: ["card-text"],
    attributeBindings: ["rows", "cols"],
    rows: "2",
    cols: "12"
});

Ficha.DeckCountView = SC.View.extend({
    tagName: "span",
    classNames: ["deck-count"],
    countBinding: "Ficha.cardsController.content.length",
    template: SC.Handlebars.compile("{{displayCount}}"),

    displayCount: function () {
        var count = this.get("count");

        return count + (count === 1 ? " card" : " cards");
    }.property("count").cacheable()
});

// rest

Ficha.cardsController.set("content", Ficha.store.find(Ficha.Card));
