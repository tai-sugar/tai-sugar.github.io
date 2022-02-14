! function () {
    "use strict";
    new Vue({
        el: "#app",
        data: {
            gas: "https://script.google.com/macros/s/AKfycbzJPK-0y3gKNLsrm4tnp9EO8sIMApXBIlj-R6YeCpxLjiKEHqHQ_Ibu3n6aUGWHh2B7Cw/exec",
            id: "",
            persons: {},
            person: {},
            loading: !1
        },
        methods: {
            limitIdLen: function (t) {
                if (t.length > 5) return this.id = this.id.slice(0, 5)
            },
            submit: function () {
                var n = this;
                n.loading = 1;
                $.ajax({
                    url: "https://script.google.com/macros/s/AKfycbzBQvle2Pu1yaWU2W3pneOAu49Hg8aGR8yiI4KGP1zXexvn3vshVjjSdLr3dlza_yAr/exec",
                    data: {
                        "id": this.person.id,
                        "name": this.person.name,
                        "seat": this.person.seat,
                        "temperature": this.person.temperature
                    },
                    success: function (response) {
                        n.loading = !1;
                        alert(response);
                    },
                });
            }
        },
        watch: {
            id: function (t) {
                var n = this;
                if (5 === t.length) {
                    if (void 0 === this.persons[this.id]) {
                        this.loading = !0;
                        var i = this.gas + "?id=" + this.id;
                        fetch(i, {
                            method: "POST"
                        }).then((function (t) {
                            return t.json()
                        })).then((function (t) {
                            if (Object.keys(t).length === 0) {
                                alert('不在參加名單');
                            } 
                             n.persons[n.id] = t, n.person = t, n.loading = !1;
                        }))
                    } else  this.person = this.persons[this.id];
                }
            }
        }
    })
}();