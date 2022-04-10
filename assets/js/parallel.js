// set the dimensions and margins of the graph
const my_data = window.document.querySelector("#my_dataviz");

var csvPath1 = "assets/data/movies25.csv";

// console.log(my_data.offsetWidth)
// console.log(innerHeight)
var margin = { top: 50, right: 30, bottom: 30, left: -10 },
  width = 293 / 0.25 - margin.left - margin.right,
  height = 952 / 2.46 - margin.top - margin.bottom;

var averageLineWidth = "2";

var x = d3.scale.ordinal().rangePoints([0, width], 1),
  y = {},
  dragging = {};

var line = d3.svg.line().interpolate("cardinal").tension(0.75),
  line2 = d3.svg.line(),
  axis = d3.svg.axis().orient("left"),
  background,
  foreground;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var backgroundcolor = "#EEEEEE";

var color1 = d3.scale
  .ordinal()
  .domain(["비흥행", "일반흥행", "최고흥행", "대흥행"])
  .range(["#b0d1eb", "#4d6dff", "#67388a", "#b24dff"]);

var color2 = d3.scale
  .ordinal()
  .domain(["비흥행", "일반흥행", "최고흥행", "대흥행"])
  .range([backgroundcolor, backgroundcolor, backgroundcolor, backgroundcolor]);

// #FFE302
var rereleasedColor1 = d3.scale
  .ordinal()
  .domain(["비흥행", "일반흥행", "최고흥행", "대흥행", "재개봉"])
  .range(["#b0d1eb", "#4d6dff", "#67388a", "#b24dff", "gold"]);

var rereleasedColor2 = d3.scale
  .ordinal()
  .domain(["비흥행", "일반흥행", "최고흥행", "대흥행", "재개봉"])
  .range([
    backgroundcolor,
    backgroundcolor,
    backgroundcolor,
    backgroundcolor,
    backgroundcolor,
  ]);

var colorGroupName = "worldwide_gross_income_group";
var colorGroupName2 = "worldwide_gross_income_group2";
// var state = JSON.parse(localStorage.getItem("state"))

var names2 = [
  // "Budget",
  "Season",
  "Age_rank",
  "Duration",
  // "director_facebook_likes",
  "Actor_power",
  "IMDB",
  "FB_likes",
  "Reviews",
  "Theater_num",
  "Worldwide_sales",
  "re_income1",
  "re_income2",
  "re_income3",
];

var genreList = [
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

// var genreYearList = [...genreList]
// genreYearList.push("Year")

var parallelColumnFontSize = "17px";

var reincomeStartPoint = names2.indexOf("re_income1");
var names = names2.slice(0, reincomeStartPoint);

// 첫 번째
d3.csv(csvPath1, function (error, movies) {
  totalNum = movies.length;
  document.getElementById("current_count").innerHTML = totalNum;

  genreRatio = {};
  for (let genre of genreList) {
    genreRatio[genre] = [];
    for (let m of movies) {
      genreRatio[genre].push(+m[genre]);
    }

    genreRatio[genre] =
      genreRatio[genre].reduce((acc, current) => acc + current, 0) /
      GenreNum[genre];

    if (genre == "Music/Musical") {
      meter = document.querySelector("meter#" + "Music_and_Musical");
    } else {
      meter = document.querySelector("meter#" + genre);
    }
    meter.value = genreRatio[genre];
  }

  // 각 변수별 평균 계산
  var average = {};
  for (let n of names2) {
    average[n] = [];
    for (let m of movies) {
      if ((n == "re_income1") | (n == "re_income2") | (n == "re_income3")) {
        if (+m[n] != 0) {
          average[n].push(+m[n]);
        }
      } else {
        average[n].push(+m[n]);
      }
    }

    average[n] =
      average[n].reduce((acc, current) => acc + current, 0) / average[n].length;
  }

  // Extract the list of dimensions and create a scale for each.
  x.domain(
    (dimensions = names.filter(function (d) {
      return (
        d != "name" &&
        (y[d] = d3.scale
          .linear()
          .domain(
            d3.extent(movies, function (p) {
              return +p[d];
            })
          )
          .range([height, 0]))
      );
    }))
  );

  // Add grey background lines for context.
  background = svg
    .append("g")
    .attr("class", "background")
    .selectAll("path")
    .data(movies)
    .enter()
    .append("path")
    .attr("class", function (d) {
      return "line " + d[colorGroupName];
    }) // 2 class for each line: 'line' and the group name
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function (d) {
      return color2(d[colorGroupName]);
    });

  // Add blue foreground lines for focus.
  foreground = svg
    .append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(movies)
    .enter()
    .append("path")
    .attr("class", function (d) {
      return "line " + d[colorGroupName];
    }) // 2 class for each line: 'line' and the group name
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function (d) {
      return color1(d[colorGroupName]);
    });

  // 평균선 추가
  foreground
    .select("g")
    .select(null)
    .data([average])
    .enter()
    .append("path")
    .attr("class", function (d) {
      return "line " + "average";
    })
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "black")
    // .style("stroke-dasharray", "3, 3")
    .style("stroke-width", averageLineWidth);

  // Add a group element for each dimension.
  var g = svg
    .selectAll(".dimension")
    .data(dimensions)
    .enter()
    .append("g")
    .attr("class", "dimension")
    .attr("transform", function (d) {
      return "translate(" + x(d) + ")";
    })
    .call(
      d3.behavior
        .drag()
        .origin(function (d) {
          return { x: x(d) };
        })
        .on("dragstart", function (d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function (d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function (a, b) {
            return position(a) - position(b);
          });
          x.domain(dimensions);
          g.attr("transform", function (d) {
            return "translate(" + position(d) + ")";
          });
        })
        .on("dragend", function (d) {
          delete dragging[d];
          transition(d3.select(this)).attr(
            "transform",
            "translate(" + x(d) + ")"
          );
          transition(foreground).attr("d", path);
          background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        })
    );

  // Add an axis and title.
  g.append("g")
    .attr("class", "axis")
    .each(function (d) {
      d3.select(this).call(axis.scale(y[d]));
    })
    .append("text")
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("stroke", "none")
    .style("font-size", parallelColumnFontSize)
    .attr("y", -25)
    .text(function (d) {
      return d;
    });

  // Add and store a brush for each axis.
  g.append("g")
    .attr("class", "brush")
    .each(function (d) {
      d3.select(this).call(
        (y[d].brush = d3.svg
          .brush()
          .y(y[d])
          .on("brushstart", brushstart)
          .on("brush", brush)
          .on("brushend", updateTwoData))
      );
    })
    .selectAll("rect")
    .attr("x", -8)
    .attr("width", 16);
});

// 업데이트
function updateData1() {
  // 기존 그래프 지우고 다시 만들기
  d3.select("#my_dataviz").select("svg").remove();

  svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(csvPath1, function (error, movies) {
    var GenreStateSum1 = Object.values(state.genres).reduce(
      (acc, current) => acc + current,
      0
    );

    // or에 체크된 장르가 있는 경우
    if (GenreStateSum1 !== 0) {
      var orFilteredGenres1 = [];
      for (genre in state.genres) {
        if (state.genres[genre] == 1) {
          orFilteredGenres1.push(genre);
        }
      }

      // or에 체크된 장르들 중 어떤 것에도 속하지 않는 데이터 제거
      movies = movies.filter((x) => {
        let temp = [];
        for (key of orFilteredGenres1) {
          temp.push(x[key]);
        }

        if (temp.reduce((acc, current) => acc + current, 0) >= 1) {
          return true;
        } else {
          return false;
        }
      });
    }

    var Genre2StateSum1 = Object.values(state.genres2).reduce(
      (acc, current) => acc + current,
      0
    );

    // and 체크된 장르가 있는 경우
    if (Genre2StateSum1 !== 0) {
      var andFilteredGenres1 = [];
      for (genre in state.genres) {
        if (state.genres2[genre + "2"] == 1) {
          andFilteredGenres1.push(genre);
        }
      }
      for (genre of andFilteredGenres1) {
        movies = movies.filter((x) => x[genre] == 1);
      }
    }

    average = {};
    for (let n of names2) {
      average[n] = [];
      for (let m of movies) {
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

    if (state.rereleased === 0) {
      parallelColumnFontSize = "17px";
      x.domain(
        (dimensions = names.filter(function (d) {
          return (
            d != "name" &&
            (y[d] = d3.scale
              .linear()
              .domain(
                d3.extent(movies, function (p) {
                  return +p[d];
                })
              )
              .range([height, 0]))
          );
        }))
      );
    } else {
      parallelColumnFontSize = "12px";
      x.domain(
        (dimensions = names2.filter(function (d) {
          return (
            d != "name" &&
            (y[d] = d3.scale
              .linear()
              .domain(
                d3.extent(movies, function (p) {
                  return +p[d];
                })
              )
              .range([height, 0]))
          );
        }))
      );
    }

    // Add grey background lines for context.
    background = svg
      .append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(movies)
      .enter()
      .append("path")
      .attr("class", function (d) {
        if (state.rereleased === 0) {
          return "line " + d[colorGroupName];
        } else {
          return "line " + d[colorGroupName2];
        }
      }) // 2 class for each line: 'line' and the group name
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function (d) {
        if (state.rereleased === 0) {
          return color2(d[colorGroupName]);
        } else {
          return rereleasedColor2(d[colorGroupName2]);
        }
      });

    // Add blue foreground lines for focus.
    foreground = svg
      .append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(movies)
      .enter()
      .append("path")
      .attr("class", function (d) {
        if (state.rereleased === 0) {
          return "line " + d[colorGroupName];
        } else {
          return "line " + d[colorGroupName2];
        }
      }) // 2 class for each line: 'line' and the group name
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function (d) {
        if (state.rereleased === 0) {
          return color1(d[colorGroupName]);
        } else {
          return rereleasedColor1(d[colorGroupName2]);
        }
      });

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

    // Add a group element for each dimension.
    var g = svg
      .selectAll(".dimension")
      .data(dimensions)
      .enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      })
      .call(
        d3.behavior
          .drag()
          .origin(function (d) {
            return { x: x(d) };
          })
          .on("dragstart", function (d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function (d) {
            dragging[d] = Math.min(width, Math.max(0, d3.event.x));
            foreground.attr("d", path);
            dimensions.sort(function (a, b) {
              return position(a) - position(b);
            });
            x.domain(dimensions);
            g.attr("transform", function (d) {
              return "translate(" + position(d) + ")";
            });
          })
          .on("dragend", function (d) {
            delete dragging[d];
            transition(d3.select(this)).attr(
              "transform",
              "translate(" + x(d) + ")"
            );
            transition(foreground).attr("d", path);
            background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
          })
      );

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function (d) {
        d3.select(this).call(axis.scale(y[d]));
      })
      .append("text")
      .style("text-anchor", "middle")
      .style("fill", "black")
      .style("stroke", "none")
      .style("font-size", parallelColumnFontSize)
      .attr("y", -25)
      .text(function (d) {
        return d;
      });

    // Add and store a brush for each axis.

    g.append("g")
      .attr("class", "brush")
      .each(function (d) {
        d3.select(this).call(
          (y[d].brush = d3.svg
            .brush()
            .y(y[d])
            .on("brushstart", brushstart)
            .on("brush", brush)
            .on("brushend", updateTwoData))
        );
      })
      .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
  });
}

function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

//console.log(dimensions.slice(9, 12))
// Returns the path for a given data point.
function path(d) {
  var endNum = 0;
  if (state.rereleased == 1) {
    if (d["re_income1"] == 0) {
      endNum = 0;
    } else if (d["re_income2"] == 0) {
      endNum = reincomeStartPoint + 1;
    } else if (d["re_income3"] == 0) {
      endNum = reincomeStartPoint + 2;
    } else if (d["re_income3"] != 0) {
      endNum = reincomeStartPoint + 3;
    }

    if (endNum == 0) {
      return line(
        dimensions.slice(0, reincomeStartPoint).map(function (p) {
          return [position(p), y[p](d[p])];
        })
      );
    } else {
      return (
        line(
          dimensions.slice(0, reincomeStartPoint).map(function (p) {
            return [position(p), y[p](d[p])];
          })
        ) +
        line2(
          dimensions.slice(reincomeStartPoint - 1, endNum).map(function (p) {
            return [position(p), y[p](d[p])];
          })
        )
      );
    }
  } else {
    return line(
      dimensions.map(function (p) {
        return [position(p), y[p](d[p])];
      })
    );
  }
}

function brushstart() {
  d3.event.sourceEvent.stopPropagation();
}

// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var actives = dimensions.filter(function (p) {
      return !y[p].brush.empty();
    }),
    extents = actives.map(function (p) {
      return y[p].brush.extent();
    });
  foreground.style("display", function (d) {
    return actives.every(function (p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    })
      ? null
      : "none";
  });

  if (actives.length >= 1) {
    brushingFilter = {};
    for (let i = 0; i < actives.length; i++) {
      brushingFilter[actives[i]] = extents[i];
    }
  } else {
    brushingFilter = {};
  }

  console.log(brushingFilter);
}
