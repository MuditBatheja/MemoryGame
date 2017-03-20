(function() {

    var Memory = {

        init: function(cards) {
            this.$game = $(".game");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function(cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function() {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.binding();
            this.paused = false;
            this.guess = null;
        },

        binding: function() {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },
        // kinda messy but hey
        cardClicked: function() {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function() {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if ($(".matched").length == $(".card").length) {
                    alert('You Won');
                    _.reset();
                }
            }
        },

        reset: function() {
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        shuffle: function(array) {
            var counter = array.length,
                temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function() {
            var frag = '';
            this.$cards.each(function(k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"alt="' + v.name + '" /></div>\
				<div class="back"><img src="images/10.jpg" alt="initial" /></div></div></div>';
            });
            return frag;
        }
    };

    var cards = [{
        name: "1",
        img: "images/1.jpg",
        id: 1,
    }, {
        name: "2",
        img: "images/2.jpg",
        id: 2
    }, {
        name: "3",
        img: "images/3.jpg",
        id: 3
    }, {
        name: "4",
        img: "images/4.jpg",
        id: 4
    }, {
        name: "5",
        img: "images/5.jpg",
        id: 5
    }, {
        name: "6",
        img: "images/6.jpg",
        id: 6
    }, {
        name: "7",
        img: "images/7.jpg",
        id: 7
    }, {
        name: "8",
        img: "images/8.jpg",
        id: 8
    }];

    Memory.init(cards);


})();
