function showMap() {
  var myChart = echarts.init(document.getElementById('d_map'))

  var dataAll = [389000, 370000, 324000, 262000 ,259000, 214000, 232000, 196000, 176000, 133000];
  var yAxisData = ['手机','家电','家具','家纺家饰','男装','女装','运动户外','箱包','鞋','个护家清'];

  function convertData(data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var city = data[i].name
      var geoCoord = geoCoordMap[city]
      if (geoCoord) {
        res.push(
          {
            name: city,
            value: geoCoord.concat(data[i].value)
          }
        );
      }
    }
    return res;
  }

  var option = {
    title: [
      {
        text: '双十一全网销售额2539.7亿',
        subtext: '数据纯属虚构',
        x: 'center',
        y: '2%',
        textStyle: {
          color: '#fff',
          fontSize: 30
        }
      },
      {
        text: '全类目品牌TOP10',
        x: '2%',
        y: '7%',
        textStyle: {
          color:"#fff",
          fontSize:"12"
        }
      },
      {
        text: '各年龄段占比',
        right: '7%',
        top: '10%',
        textStyle: {
          color:"#fff",
          fontSize:"12"
        }
      }
    ],
    grid: [
      {x: '5%', y: '10%', width: '20%', height: '40%'},
    ],
    tooltip: {
      trigger: 'item',
      formatter: function(data) {
        return data.name + '<br/>'
          + '排名: '+ (data.dataIndex + 1) + '<br/>'
          +  _.takeRight(data.value) + '万元';
      }
    },
    toolbox: {
      show : true,
      y: 'top',
      feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        magicType : {show: true, type: ['line', 'bar']},
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    calculable: true,
    visualMap: {
      type: 'piecewise',
      splitNumber: 3,
      pieces: [
        {
          max: 100000,
          min: 80000,
          label: '第一档',
          color: '#f4fc6c'
        },
        {
          max: 80000,
          min: 60000,
          label: '第二档',
          color: '#fc5353',
        },
        {
          max: 60000,
          min: 40000,
          label: '第三档',
          color: '#ff60c5'
        },
        {
          max: 40000,
          min: 20000,
          label: '第四档',
          color: '#e68b55'
        },
        {
          max: 20000,
          min: 0,
          label: '第五档',
          color: '#9a68ff'
        }
      ],
      textStyle: {
        color: '#fff'
      },
      min: 0,
      max: 100000,
      right:'20%',
      bottom:'20',
      calculable: true,
      show: true,
      seriesIndex: 0,
    },
    geo: {
      map: 'china',
      layoutCenter : ['50%','50%'],
      layoutSize : '100%',
      label: {
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#66d1ff',
          borderColor: '#111',
        },
        emphasis: {
          areaColor: '#f4fc6c'
        }
      }
    },
    xAxis: [
      {
        gridIndex: 0,
        axisTick: {show: false},
        axisLabel: {show: false},
        splitLine: {show: false},
        axisLine: {show: false}
      }
    ],
    yAxis: [
      {
        gridIndex: 0, interval: 0, data: yAxisData.reverse(),
        axisTick: {show: false}, axisLabel: {show: true}, splitLine: {show: false},
        axisLine: {show: true, lineStyle: {color: "#6173a3"}}
      }
    ],
    series: [
      {
        name: '各大城市成交额',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: 12,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        name: '城市成交额Top 3',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function (a, b) {
          return b.value - a.value;
        }).slice(0, 3)),
        symbolSize: 20,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4fc6c',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      },
      {
        name: '全类目品牌TOP10',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: '45%',
        itemStyle: {normal: {color: '#86c9f4'}},
        label: {normal: {show: true, position: "right", textStyle: {color: "#9EA7C4"}}},
        data: dataAll.sort()
      },
      {
        name: '销售平台占比',
        type: 'pie',
        center: ['11.5%', '65%'],
        radius : '20%',
        color:['#ffd285','#fc5353','#ff60c5','#e68b55','#9a68ff','#66d1ff'],
        data:[
          {value:69.80, name:'天猫'},
          {value:16.40, name:'京东'},
          {value:4.20, name:'苏宁'},
          {value:4.20, name:'唯品会'},
          {value:2.20, name:'亚马逊'},
          {value:3.20, name:'其他'}
        ],
        label: {
          normal: {
            fontSize: 10,
          }
        }
      },
      {
        name: '移动端占比',
        type: 'pie',
        center: ['6%', '85%'],
        radius: ['12%', '20%'],
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [
          {
            value: 91.1,
            name: '移动端',
            itemStyle: {
              normal: {
                color: '#ffd285'
              }
            },
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  color: '#ffd285',
                  fontSize: 20

                }
              }
            }
          },
          {
            value: 8.9,
            name: 'PC端',
            itemStyle: {
              normal: {
                color: '#87CEFA'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#ffd285',
                },
                formatter: '\n移动端占比'
              }
            }
          }]
      },
      {
        name: '男女比',
        type: 'pie',
        center: ['17%', '85%'],
        radius: ['12%', '20%'],
        label: {
          normal: {
            position: 'center'
          }
        },
        data: [
          {
            value: 51.3,
            name: '女',
            itemStyle: {
              normal: {
                color: '#ff60c5'
              }
            },
            label: {
              normal: {
                formatter: '{d} %',
                textStyle: {
                  color: '#ff60c5',
                  fontSize: 20

                }
              }
            }
          },
          {
            value: 48.7,
            name: '男',
            itemStyle: {
              normal: {
                color: '#87CEFA'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#ff60c5'
                },
                formatter: '\n女性占比'
              }
            }
          }]
      },
      {
        name:'漏斗图',
        type:'funnel',
        x: '80%',
        y: 100,
        width: '20%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 0,
        data:[
          {value:51.9, name:'80后'},
          {value:24.6, name:'70后'},
          {value:16.4, name:'90后'},
          {value:5.7, name:'60后'},
          {value:1.3, name:'50后'},
          {value:0.1, name:'其他'}
        ].sort(function (a, b) { return a.value - b.value}),
        roseType: true,
        label: {
          normal: {
            formatter: function (params) {
              return params.name + ' ' + params.value + '%';
            },
            position: 'center'
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    ]
  }

  var map = {
    currentIndex: -1
  }
  showTooltip(map, option, myChart);

  myChart.setOption(option);
}
