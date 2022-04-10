// https://d3js.org/d3.v3.min.js

var csvPath2 = "assets/data/movies25.csv";

// 조정 효과 바로 보임

var size2 = 440;
var margin2 = 74;

// 조정 효과 없어보임
var size1 = 800;
var margin1 = 200;

var isPending = 0;

var dimensions = [
  // "Budget",
  "Duration",
  // "director_facebook_likes",
  "Actor_power",
  "IMDB",
  "FB_likes",
  "Reviews",
  "Theater_num",
  // "distributor_share_percent",
];

var colorGroup = "worldwide_gross_income_group";
var colorGroup2 = "worldwide_gross_income_group2";

var totalNum;

var GenreNum = {
  Action: 353,
  Adventure: 262,
  Animation: 75,
  Biography: 94,
  Comedy: 392,
  Crime: 165,
  Drama: 554,
  Family: 65,
  Fantasy: 101,
  History: 33,
  Horror: 122,
  Mystery: 104,
  Romance: 168,
  "Sci-Fi": 104,
  Sport: 21,
  Thriller: 202,
  "Music/Musical": 36,
};

var utils = {
  merge: function (e, n) {
    for (var t in n)
      n[t] && n[t].constructor == Object && e[t]
        ? this.merge(e[t], n[t])
        : (e[t] = n[t]);
  },
  mergeAll: function () {
    for (var e = {}, n = arguments, t = 0; t < n.length; t++)
      this.merge(e, n[t]);
    return e;
  },
  htmlToNode: function (e, n) {
    for (; n.lastChild; ) n.removeChild(n.lastChild);
    return this.appendHtmlToNode(e, n);
  },
  appendHtmlToNode: function (e, n) {
    return n.appendChild(
      document.importNode(
        new DOMParser().parseFromString(e, "text/html").body.childNodes[0],
        !0
      )
    );
  },
};
// "c7a0cc", "b27bb4", "003571", "5d538e"
var radvizComponent = function (rereleased_ckecked) {
  if (rereleased_ckecked === 0) {
    var e = {
      el: null,
      size: size1,
      margin: margin1,
      colorScale: d3.scale
        .ordinal()
        .range([
          "rgb(176, 209, 235)",
          "rgb(77, 109, 255)",
          "rgb(178, 77, 255)",
          "rgb(103, 56, 138)",
        ]),
      colorAccessor: null,
      dimensions: [],
      drawLinks: !0,
      zoomFactor: 1,
      dotRadius: 6,
      dotSide: 12,
      useRepulsion: !1,
      useTooltip: !0,
      tooltipFormatter: function (e) {
        return e;
      },
    };
  } else {
    var e = {
      el: null,
      size: size1,
      margin: margin1,
      colorScale: d3.scale.ordinal().range([
        "rgb(176, 209, 235)", // 하늘
        "rgb(77, 109, 255)", // 파랑
        "rgb(178, 77, 255)", // 연보라
        "rgb(103, 56, 138)", // 보라
        "#F0C420", // 금색
      ]),
      colorAccessor: null,
      dimensions: [],
      drawLinks: !0,
      zoomFactor: 1,
      dotRadius: 6,
      dotSide: 12,
      useRepulsion: !1,
      useTooltip: !0,
      tooltipFormatter: function (e) {
        return e;
      },
    };
  }

  var n = d3.dispatch("panelEnter", "panelLeave", "dotEnter", "dotLeave");

  // var t = d3.layout.force().chargeDistance(0).charge(-60).friction(0.5)
  var t = d3.layout
    .force()
    .chargeDistance(0)
    .charge(-60)
    .friction(0)
    .gravity(-0.2);

  t.fullSpeed = true;

  var r = function (r) {
      r = i(r);
      var o = "_normalized",
        a = e.dimensions.map(function (e) {
          return e + o;
        }),
        c = d3.scale
          .linear()
          .domain([0, a.length])
          .range([0, 2 * Math.PI]),
        s = e.size / 2 - e.margin,
        l = r.length,
        u = e.size - 2 * e.margin,
        d = e.dimensions.map(function (n, t) {
          var r = c(t),
            o = s + Math.cos(r) * s * e.zoomFactor,
            i = s + Math.sin(r) * s * e.zoomFactor;
          return { index: l + t, x: o, y: i, fixed: !0, name: n };
        }),
        f = [];

      r.forEach(function (e, n) {
        a.forEach(function (t, r) {
          f.push({ source: n, target: l + r, value: e[t] });
        });
      }),
        t
          .size([u, u])
          .linkStrength(function (e) {
            return e.value;
          })
          .nodes(r.concat(d))
          .links(f)
          .start();

      var p = d3
        .select(e.el)
        .append("svg")
        .attr({ width: e.size, height: e.size / 1.2 });
      p.append("rect")
        .classed("bg", !0)
        .attr({ width: e.size, height: e.size / 1.2 });
      {
        var m = p
          .append("g")
          .attr({ transform: "translate(" + [e.margin, e.margin / 3] + ")" });
        m.append("circle")
          .classed("panel", !0)
          .attr({ r: s, cx: s, cy: s, stroke: "black", "stroke-width": "3" });
      }
      if (
        (e.useRepulsion &&
          (m.on("mouseenter", function () {
            t.chargeDistance(80).alpha(0.2), n.panelEnter();
          }),
          m.on("mouseleave", function () {
            t.chargeDistance(0).resume(), n.panelLeave();
          })),
        e.drawLinks)
      )
        var h = m
          .selectAll(".link")
          .data(f)
          .enter()
          .append("line")
          .classed("link", !0);

      {
        if (state.rereleased === 1) {
          var r1 = r.filter((x) => x.is_rereleased == 0);
          var r2 = r.filter((x) => x.is_rereleased == 1);
        } else {
          var r1 = r;
        }

        var g1 = m
          .selectAll("circle.dot")
          .data(r1)
          .enter()
          .append("circle")
          .classed("dot", !0)
          .attr({
            r: e.dotRadius,
            fill: function (n) {
              return e.colorScale(e.colorAccessor(n));
            },
          })
          .on("mouseenter", function (t) {
            if (e.useTooltip) {
              var r = d3.mouse(e.el);
              v.setText(e.tooltipFormatter(t))
                .setPosition(r[0] * 2.3, r[1] * 1.2)
                .show();
            }
            n.dotEnter(t), this.classList.add("active");
          })
          .on("mouseout", function (t) {
            e.useTooltip && v.hide(),
              n.dotLeave(t),
              this.classList.remove("active");
          });

        if (state.rereleased === 1) {
          var g2 = m
            .selectAll("rect.dot")
            .data(r2)
            .enter()
            .append("rect")
            .classed("dot", !0)
            .attr({
              width: e.dotSide,
              height: e.dotSide,
            })
            .style("fill", function (n) {
              return e.colorScale(e.colorAccessor(n));
            })
            .on("mouseenter", function (t) {
              if (e.useTooltip) {
                var r = d3.mouse(e.el);
                v.setText(e.tooltipFormatter(t)).setPosition(r[0], r[1]).show();
              }
              n.dotEnter(t), this.classList.add("active");
            })
            .on("mouseout", function (t) {
              e.useTooltip && v.hide(),
                n.dotLeave(t),
                this.classList.remove("active");
            });
        }

        backgroundLines = [];
        m
          .selectAll("circle.label-node")
          .data(d)
          .enter()
          .append("circle")
          .classed("label-node", !0)
          .attr({
            cx: function (e) {
              backgroundLines.push(e);
              return e.x;
            },
            cy: function (e) {
              return e.y;
            },
            r: 4,
          }),
          m
            .selectAll("text.label")
            .data(d)
            .enter()
            .append("text")
            .style("fill", "black")
            .style("font-weight", "bold")
            .style("stroke", "none")
            .style("font-size", "17px")

            .classed("label", !0)
            .attr({
              x: function (e) {
                return e.x;
              },
              y: function (e) {
                return e.y;
              },
              "text-anchor": function (e) {
                return e.x > 0.4 * u && e.x < 0.6 * u
                  ? "middle"
                  : e.x > u / 2
                  ? "start"
                  : "end";
              },
              "dominant-baseline": function (e) {
                return e.y > 0.6 * u ? "hanging" : "auto";
              },
              dx: function (e) {
                return e.x > u / 2 ? "6px" : "-6px";
              },
              dy: function (e) {
                return e.y > 0.6 * u ? "6px" : "-6px";
              },
            })
            .text(function (e) {
              return e.name;
            });
      }

      if (state.rereleased === 0) {
        t.on("tick", function () {
          e.drawLinks &&
            h.attr({
              x1: function (e) {
                return e.source.x;
              },
              y1: function (e) {
                return e.source.y;
              },
              x2: function (e) {
                return e.target.x;
              },
              y2: function (e) {
                return e.target.y;
              },
            }),
            g1.attr({
              cx: function (e) {
                return e.x;
              },
              cy: function (e) {
                return e.y;
              },
            });
        });
      } else {
        t.on("tick", function () {
          e.drawLinks &&
            h.attr({
              x1: function (e) {
                return e.source.x;
              },
              y1: function (e) {
                return e.source.y;
              },
              x2: function (e) {
                return e.target.x;
              },
              y2: function (e) {
                return e.target.y;
              },
            }),
            g1.attr({
              cx: function (e) {
                return e.x;
              },
              cy: function (e) {
                return e.y;
              },
            });
          g2.attr({
            x: function (e) {
              return e.x;
            },
            y: function (e) {
              return e.y;
            },
          });
        });
      }

      for (backgroundLine of backgroundLines) {
        m.append("line")
          .attr("x1", backgroundLine.x)
          .attr("y1", backgroundLine.y)
          .attr("x2", s)
          .attr("y2", s)
          .attr("class", "backgroundLines")
          .attr("stroke", "black")
          .style("stroke-dasharray", "3, 3")
          .attr("stroke-width", "0.15");
      }

      var x = d3.select(e.el).append("div").attr({ id: "radviz-tooltip" }),
        v = tooltipComponent(x.node());
      return this;
    },
    o = function (n) {
      return (e = utils.mergeAll(e, n)), this;
    },
    i = function (n) {
      n.forEach(function (n) {
        e.dimensions.forEach(function (e) {
          n[e] = +n[e];
        });
      });
      var t = {};
      return (
        e.dimensions.forEach(function (e) {
          t[e] = d3.scale
            .linear()
            .domain(
              d3.extent(
                n.map(function (n) {
                  return n[e];
                })
              )
            )
            .range([0, 1]);
        }),
        n.forEach(function (n) {
          e.dimensions.forEach(function (e) {
            n[e + "_normalized"] = t[e](n[e]);
          });
        }),
        n
      );
    },
    a = { config: o, render: r };

  isPending = 0;
  return d3.rebind(a, n, "on"), a;
};
var tooltipComponent = function (e) {
  var n = d3
      .select(e)
      .style({ position: "absolute", "pointer-events": "none" }),
    t = function (e) {
      return n.html(e), this;
    },
    r = function (e, t) {
      return n.style({ left: e + "px", top: t + "px" }), this;
    },
    o = function () {
      return n.style({ display: "block" }), this;
    },
    i = function () {
      return n.style({ display: "none" }), this;
    };
  return { setText: t, setPosition: r, show: o, hide: i };
};

var radviz = radvizComponent(0).config({
  el: document.querySelector("#my_dataviz2"),
  colorAccessor: function (d) {
    return d[colorGroup];
  },
  dimensions: dimensions,
  // 800, 200
  size: size2,
  margin: margin2,
  useRepulsion: false,
  drawLinks: false,
  tooltipFormatter: function (d) {
    return "<h5>" + d["title"] + "</h5>";
  },
});

var rereleasedRadviz = radvizComponent(1).config({
  el: document.querySelector("#my_dataviz2"),
  colorAccessor: function (d) {
    return d[colorGroup2];
  },
  dimensions: dimensions,
  size: size2,
  margin: margin2,
  useRepulsion: false,
  drawLinks: false,
  tooltipFormatter: function (d) {
    return "<h5>" + d["title"] + "</h5>";
  },
});

// 첫번째
d3.csv(csvPath2, function (error, data) {
  totalNum = data.length;
  document.getElementById("current_count").innerHTML = totalNum;

  radviz.render(data);
});

// 업데이트
function updateData2() {
  if (isPending == 0) {
    d3.select("#my_dataviz2").select("svg").remove();

    d3.csv(csvPath2, function (error, data) {
      var GenreStateSum2 = Object.values(state.genres).reduce(
        (acc, current) => acc + current,
        0
      );

      // or 체크된 장르가 있는 경우
      if (GenreStateSum2 !== 0) {
        var orFilteredGenres2 = [];
        for (genre in state.genres) {
          if (state.genres[genre] == 1) {
            orFilteredGenres2.push(genre);
          }
        }

        // or 체크된 장르들 중 어떤 것에도 속하지 않는 데이터 제거
        data = data.filter((x) => {
          let temp = [];
          for (key of orFilteredGenres2) {
            temp.push(x[key]);
          }

          if (temp.reduce((acc, current) => acc + current, 0) >= 1) {
            return true;
          } else {
            return false;
          }
        });
      }

      var Genre2StateSum2 = Object.values(state.genres2).reduce(
        (acc, current) => acc + current,
        0
      );

      // and 체크된 장르가 있는 경우
      if (Genre2StateSum2 !== 0) {
        var andFilteredGenres2 = [];
        for (genre in state.genres) {
          if (state.genres2[genre + "2"] == 1) {
            andFilteredGenres2.push(genre);
          }
        }
        for (genre of andFilteredGenres2) {
          data = data.filter((x) => x[genre] == 1);
        }
      }

      for (let key in brushingFilter) {
        data = data.filter(
          (x) =>
            (x[key] >= brushingFilter[key][0]) &
            (x[key] <= brushingFilter[key][1])
        );
      }

      average = {};
      for (let n of names2) {
        average[n] = [];
        for (let m of data) {
          if ((n == "re_income1") | (n == "re_income2") | (n == "re_income3")) {
            if (+m[n] != 0) {
              average[n].push(+m[n]);
            }
          } else {
            average[n].push(+m[n]);
          }
        }

        average[n] =
          average[n].reduce((acc, current) => acc + current, 0) /
          average[n].length;
      }

      document.getElementsByClassName("average")[0].remove();

      foreground
        .select("g")
        .select(null)
        .data([average])
        .enter()
        .append("path")
        .attr("class", function (d) {
          return "average";
        })
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black")
        // .style("stroke-dasharray", "3, 3")
        .style("stroke-width", averageLineWidth);

      totalNum = data.length;
      document.getElementById("current_count").innerHTML = totalNum;

      genreRatio = {};
      for (let genre of genreList) {
        genreRatio[genre] = [];
        for (let m of data) {
          genreRatio[genre].push(+m[genre]);
        }

        if (totalNum === 0) {
          genreRatio[genre] = 0;
        } else {
          genreRatio[genre] =
            genreRatio[genre].reduce((acc, current) => acc + current, 0) /
            GenreNum[genre];
        }

        if (genre == "Music/Musical") {
          meter = document.querySelector("meter#" + "Music_and_Musical");
        } else {
          meter = document.querySelector("meter#" + genre);
        }
        meter.value = genreRatio[genre];
      }

      if (document.querySelector("#my_dataviz2 svg") == null) {
        if (state.rereleased === 0) {
          radviz.render(data);
        } else {
          rereleasedRadviz.render(data);
        }
      }
    });
  }
}
