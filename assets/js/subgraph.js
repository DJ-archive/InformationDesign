var csvPath3 = "assets/data/movies25.csv";

var marginStacked = { top: 20, right: 150, bottom: 50, left: 50 },
  widthStacked = 600 - marginStacked.left - marginStacked.right,
  heightStacked = 400 - marginStacked.top - marginStacked.bottom;

var xScale = d3.scale.ordinal().rangeRoundBands([0, heightStacked], 0.3);
var yScale = d3.scale.linear().rangeRound([heightStacked, 0]);

var color = d3.scale
  .ordinal()
  .range([
    "#D4A6C8",
    "#B07AA1",
    "#FABFD2",
    "#D37295",
    "#A69B98",
    "#79706E",
    "#EF9694",
    "#E15759",
    "#83BAB4",
    "#499894",
    "#F1CE63",
    "#B6992D",
    "#8CD17D",
    "#59A14F",
    "#FFBE7D",
    "#F28E2B",
    "#A0CBE8",
  ]);

var segmentsStacked = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "Music/Musical",
];

var xAxis = d3.svg.axis().scale(xScale).orient("bottom").innerTickSize([0]);

var yAxis = d3.svg
  .axis()
  .scale(yScale)
  .orient("left")
  .tickFormat(d3.format(".2s")); // for the stacked totals version

var stack = d3.layout.stack(); // default view is "zero" for the count display.

var svg3 = d3
  .select("#my_dataviz3")
  .append("svg")
  .attr("width", widthStacked + marginStacked.left + marginStacked.right)
  .attr("height", heightStacked + marginStacked.top + marginStacked.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginStacked.left + "," + marginStacked.top + ")"
  );

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

var percentClicked = false;

function drawLegend() {
  var labels = [...segmentsStacked];
  var legend = svg3
    .selectAll(".legend")
    .data(color.domain().slice()) // what do you think this does?
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
      // return "translate(0," + Math.abs((i - 8) * 20) + ")"
    });
  // Added the absolute value and transition. I reversed the names, so that I can continue to use category20(), but have health as green to make it stand out.

  legend
    .append("rect")
    .attr("x", widthStacked)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend
    .append("text")
    .attr("x", widthStacked + 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d, i) {
      return labels[i];
    });
}

// 첫 번째

var isPending2 = 0;
d3.csv(csvPath3, function (error, movies) {
  var yearGenre = [
    {
      year: 2010,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2011,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2012,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2013,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2014,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2015,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2016,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
    {
      year: 2017,
      Action: [0],
      Adventure: [0],
      Animation: [0],
      Biography: [0],
      Comedy: [0],
      Crime: [0],
      Drama: [0],
      Family: [0],
      Fantasy: [0],
      History: [0],
      Horror: [0],
      Mystery: [0],
      Romance: [0],
      "Sci-Fi": [0],
      Sport: [0],
      Thriller: [0],
      "Music/Musical": [0],
    },
  ];

  for (let movie of movies) {
    for (let genre of genreList) {
      yearGenre[parseInt(movie["year"]) - 2010][genre].push(movie[genre]);
    }
  }

  for (let index in yearGenre) {
    for (let genre of genreList) {
      yearGenre[index][genre] = yearGenre[index][genre].reduce(
        (acc, current) => parseInt(acc) + parseInt(current),
        0
      );
    }
  }

  data = [...yearGenre];

  data.sort(function (a, b) {
    return +a.total - +b.total;
  });

  var stacked = stack(makeData(segmentsStacked, data));

  xScale.domain(
    data.map(function (d) {
      return d.year;
    })
  );

  svg3
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + heightStacked + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("dy", "1em")
    .attr("dx", "1em")
    .style("text-anchor", "end");

  svg3
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
  // .text("segmentsStacked")

  var year = svg3
    .selectAll(".year")
    .data(stacked)
    .enter()
    .append("g")
    .attr("class", "year")
    .style("fill", function (d, i) {
      return color(i);
    });

  var rectangles = year
    .selectAll("rect")
    .data(function (d) {
      // console.log("array for a rectangle");
      return d;
    }) // this just gets the array for bar segment.
    .enter()
    .append("rect")
    .attr("width", xScale.rangeBand());

  // this just draws them in the default way, now they're appended.
  transitionCount();

  drawLegend();

  d3.selectAll("input").on("change", handleFormClick);

  // All the functions for stuff above!

  function handleFormClick() {
    if (this.value === "bypercent") {
      percentClicked = true;
      transitionPercent();
    } else {
      percentClicked = false;
      transitionCount();
    }
  }

  function makeData(segmentsStacked, data) {
    return segmentsStacked.map(function (component) {
      return data.map(function (d) {
        return { x: d["year"], y: +d[component], component: component };
      });
    });
  }

  function transitionPercent() {
    yAxis.tickFormat(d3.format("%"));
    stack.offset("expand"); // use this to get it to be relative/normalized!
    var stacked = stack(makeData(segmentsStacked, data));
    // call function to do the bars, which is same across both formats.
    transitionRects(stacked);
  }

  function transitionCount() {
    yAxis.tickFormat(d3.format(".2s")); // for the stacked totals version
    stack.offset("zero");
    var stacked = stack(makeData(segmentsStacked, data));
    transitionRects(stacked);
  }

  function transitionRects(stacked) {
    // this domain is using the last of the stacked arrays, which is the last illness, and getting the max height.
    yScale.domain([
      0,
      d3.max(stacked[stacked.length - 1], function (d) {
        return d.y0 + d.y;
      }),
    ]);

    // attach new fixed data
    var year = svg3.selectAll(".year").data(stacked);

    // same on the rects
    year.selectAll("rect").data(function (d) {
      return d;
    }); // this just gets the array for bar segment.

    svg3
      .selectAll("g.year rect")
      .transition()
      .duration(250)
      .attr("x", function (d) {
        return xScale(d.x);
      })
      .attr("y", function (d) {
        return yScale(d.y0 + d.y);
      }) //
      .attr("height", function (d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);
      }); // height is base - tallness

    svg3.selectAll(".y.axis").transition().call(yAxis);
  }
  // =====================================================================
  // Building a legend by hand, based on http://bl.ocks.org/mbostock/3886208
  // ===================================================================

  // ================================================================
  // Mouse Events
  // ================================================================

  // rectangles
  //   .on("mouseover", mouseoverFunc)
  //   .on("mousemove", mousemoveFunc)
  //   .on("mouseout", mouseoutFunc)

  // function mouseoverFunc(d) {
  //   console.log("moused over", d.x)
  //   if (percentClicked) {
  //     tooltip
  //       .style("display", null)
  //       .html("<p><span class='tooltipHeader'>" + d3.format("%")(d.y) + "</p>")
  //     // .html("<p><span class='tooltipHeader'>" + d.x + "</span><br>"+ d.component + ": " + d3.format("%")(d.y) + "</p>");
  //   } else {
  //     console.log("segmentsStacked", d.component, "percent", d.y)

  //     tooltip
  //       .style("display", null)
  //       .html("<p><span class='tooltipHeader'>" + d.y + "</p>")
  //     // .html("<p><span class='tooltipHeader'>" + d.x + "</span><br>"+ d.component + ": " +d.y + "</p>");
  //   }
  // }

  // function mousemoveFunc(d) {
  //   tooltip
  //     .style("top", d3.event.pageY - 5 + "px")
  //     .style("left", d3.event.pageX + 10 + "px")
  // }

  // function mouseoutFunc(d) {
  //   return tooltip.style("display", "none") // this sets it to invisible!
  // }
});

// 업데이트
function updateData3() {
  if (isPending2 == 0) {
    isPending2 = 1;
    d3.select("#my_dataviz3").select("svg").remove();

    d3.csv(csvPath3, function (error, data) {
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

        // 체크된 장르들 중 어떤 것에도 속하지 않는 데이터 제거
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

      yearGenre = [
        {
          year: 2010,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2011,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2012,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2013,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2014,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2015,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2016,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2017,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
      ];

      rereleasedYearGenre = [
        {
          year: 2010,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2011,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2012,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2013,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2014,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2015,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2016,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2017,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2018,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2019,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2020,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
        {
          year: 2021,
          Action: [0],
          Adventure: [0],
          Animation: [0],
          Biography: [0],
          Comedy: [0],
          Crime: [0],
          Drama: [0],
          Family: [0],
          Fantasy: [0],
          History: [0],
          Horror: [0],
          Mystery: [0],
          Romance: [0],
          "Sci-Fi": [0],
          Sport: [0],
          Thriller: [0],
          "Music/Musical": [0],
        },
      ];

      for (let movie of data) {
        for (let genre of genreList) {
          if (state.rereleased == 0) {
            yearGenre[parseInt(movie["year"]) - 2010][genre].push(movie[genre]);
          } else {
            if (movie["re_year1"] >= 2010) {
              rereleasedYearGenre[parseInt(movie["re_year1"]) - 2010][
                genre
              ].push(movie[genre]);
            }
          }
        }
      }

      if (state.rereleased == 0) {
        for (let index in yearGenre) {
          for (let genre of genreList) {
            yearGenre[index][genre] = yearGenre[index][genre].reduce(
              (acc, current) => parseInt(acc) + parseInt(current),
              0
            );
          }
        }

        data = [...yearGenre];
      } else {
        for (let index in rereleasedYearGenre) {
          for (let genre of genreList) {
            rereleasedYearGenre[index][genre] = rereleasedYearGenre[index][
              genre
            ].reduce((acc, current) => parseInt(acc) + parseInt(current), 0);
          }
        }

        data = [...rereleasedYearGenre];
      }

      data.sort(function (a, b) {
        return +a.total - +b.total;
      });

      var stacked = stack(makeData(segmentsStacked, data));

      xScale.domain(
        data.map(function (d) {
          return d.year;
        })
      );

      svg3 = d3
        .select("#my_dataviz3")
        .append("svg")
        .attr("width", widthStacked + marginStacked.left + marginStacked.right)
        .attr(
          "height",
          heightStacked + marginStacked.top + marginStacked.bottom
        )
        .append("g")
        .attr(
          "transform",
          "translate(" + marginStacked.left + "," + marginStacked.top + ")"
        );

      svg3
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightStacked + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dy", "1em")
        .attr("dx", "1em")
        .style("text-anchor", "end");

      svg3
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
      // .text("segmentsStacked")

      var year = svg3
        .selectAll(".year")
        .data(stacked)
        .enter()
        .append("g")
        .attr("class", "year")
        .style("fill", function (d, i) {
          return color(i);
        });

      var rectangles = year
        .selectAll("rect")
        .data(function (d) {
          // console.log("array for a rectangle");
          return d;
        }) // this just gets the array for bar segment.
        .enter()
        .append("rect")
        .attr("width", xScale.rangeBand());

      // this just draws them in the default way, now they're appended.
      transitionCount();

      drawLegend();

      d3.selectAll("input").on("change", handleFormClick);

      // All the functions for stuff above!

      function handleFormClick() {
        if (this.value === "bypercent") {
          percentClicked = true;
          transitionPercent();
        } else {
          percentClicked = false;
          transitionCount();
        }
      }

      function makeData(segmentsStacked, data) {
        return segmentsStacked.map(function (component) {
          return data.map(function (d) {
            return { x: d["year"], y: +d[component], component: component };
          });
        });
      }

      function transitionPercent() {
        yAxis.tickFormat(d3.format("%"));
        stack.offset("expand"); // use this to get it to be relative/normalized!
        var stacked = stack(makeData(segmentsStacked, data));
        // call function to do the bars, which is same across both formats.
        transitionRects(stacked);
      }

      function transitionCount() {
        yAxis.tickFormat(d3.format(".2s")); // for the stacked totals version
        stack.offset("zero");
        var stacked = stack(makeData(segmentsStacked, data));
        transitionRects(stacked);
      }

      function transitionRects(stacked) {
        // this domain is using the last of the stacked arrays, which is the last illness, and getting the max height.
        yScale.domain([
          0,
          d3.max(stacked[stacked.length - 1], function (d) {
            return d.y0 + d.y;
          }),
        ]);

        // attach new fixed data
        var year = svg3.selectAll(".year").data(stacked);

        // same on the rects
        year.selectAll("rect").data(function (d) {
          return d;
        }); // this just gets the array for bar segment.

        svg3
          .selectAll("g.year rect")
          .transition()
          .duration(250)
          .attr("x", function (d) {
            return xScale(d.x);
          })
          .attr("y", function (d) {
            return yScale(d.y0 + d.y);
          }) //
          .attr("height", function (d) {
            return yScale(d.y0) - yScale(d.y0 + d.y);
          }); // height is base - tallness

        svg3.selectAll(".y.axis").transition().call(yAxis);
      }
      // =====================================================================
      // Building a legend by hand, based on http://bl.ocks.org/mbostock/3886208
      // ===================================================================
    });

    isPending2 = 0;
  }
}
