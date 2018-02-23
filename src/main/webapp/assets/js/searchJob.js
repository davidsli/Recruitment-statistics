$(function(){
	$("#search").click(function(){
		 var cityname=$("#city").val();
		 if(cityname==""){
			 alert("请选择城市");
			 return ;
		 }
		 var name=$("#position").val();
		 if(name==""){
			 alert("请输入查询的职位");
			 return;
		 }
		 $("#exps").empty();
		 $("#educations").empty();
		 $("#exp").empty();
		 $("#education").empty();
		 $(".chr").removeAttr("_echarts_instance_");$(".chr").removeAttr("style");

		 $(".position").css("display","block");
		 $(".position").text("职位："+name+"对应的关系");

		 
		 $.ajax({
				type:'post',
				url:'job/findpriceExp',
				contentType:'application/json;charset=utf-8',
				//数据格式是json串
				data:'{"cityname":"'+cityname+'","name":"'+name+'"}',
				success:function(data){//返回json结果
					if(data==""){
						alert("没有该职位的信息，请更新");
						return ;
					}
					//统计工作经验与工资的关系
					var exp=[];
					var minprice=[],maxprice=[];
					for(var i=0;i<data.length;i++){
						exp.push(data[i].exp);
						maxprice.push(data[i].maxprice);
						minprice.push(data[i].minprice);
					}
					option = {
						    title : {
						        text: '工作经验与工资的关系',
						        subtext: '数据来自智联招聘',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'axis'
						    },
						    legend: {
						    	x : 'left',
						        data:['最高','最低']
						    },
						    toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    calculable : true,
						    xAxis : [
						        {
						            type : 'category',
						            data : exp
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value'
						        }
						    ],
						    series : [
						        {
						            name:'最高',
						            type:'bar',
						            data:maxprice,
						            
						            markLine : {
						                data : [
						                    {type : 'average', name: '平均值'}
						                ]
						            }
						        },
						        {
						            name:'最低',
						            type:'bar',
						            data:minprice,
						            markLine : {
						                data : [
						                    {type : 'average', name : '平均值'}
						                ]
						            }
						        }
						    ]
						};
					var mychart=echarts.init(document.getElementById("exps"),"macarons");
					mychart.setOption(option);
				}
			});
//-------------------------------------------------------------------------------
			$.ajax({
				type:'post',
				url:'job/findpriceEducation',
				contentType:'application/json;charset=utf-8',
				//数据格式是json串
				data:'{"cityname":"'+cityname+'","name":"'+name+'"}',
				success:function(data){//返回json结果
					if(data==""){
						return ;
					}
					//统计学历与工资的关系
					var education=[];
					var minprice=[],maxprice=[];
					for(var i=0;i<data.length;i++){
						education.push(data[i].education);
						maxprice.push(data[i].maxprice);
						minprice.push(data[i].minprice);
					}
					educationsoption = {
						    title : {
						        text: '学历与工资的关系',
						        subtext: '数据来自智联招聘',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'axis'
						    },
						    legend: {
						    	x : 'left',
						        data:['最高','最低']
						    },
						    toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {show: true, type: ['line', 'bar']},
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    calculable : true,
						    xAxis : [
						        {
						            type : 'category',
						            data : education
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value'
						        }
						    ],
						    series : [
						        {
						            name:'最高',
						            type:'bar',
						            data:maxprice,
						            
						            markLine : {
						                data : [
						                    {type : 'average', name: '平均值'}
						                ]
						            }
						        },
						        {
						            name:'最低',
						            type:'bar',
						            data:minprice,
						            markLine : {
						                data : [
						                    {type : 'average', name : '平均值'}
						                ]
						            }
						        }
						    ]
						};
					var mychart=echarts.init(document.getElementById("educations"),"macarons");
					mychart.setOption(educationsoption);
				}
			});
//=======================================================================================
			$.ajax({
				type:'post',
				url:'job/finddemandExp',
				contentType:'application/json;charset=utf-8',
				//数据格式是json串
				data:'{"cityname":"'+cityname+'","name":"'+name+'"}',
				success:function(data){//返回json结果
					if(data==""){
						return ;
					}
					//工作经验和用人需求的关系
					var exp=[],name=[];
					for(var i=0;i<data.length;i++){
						var item={
								value:data[i].total, name:data[i].exp
						}
						name.push(data[i].exp);
						exp.push(item);
					}
					expTotaloption = {
						    title : {
						        text: '工作经验和用人需求的关系',
						        subtext: '智联招聘',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    legend: {
						        orient : 'vertical',
						        x : 'left',
						        data:name
						    },
						    toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {
						                show: true, 
						                type: ['pie', 'funnel'],
						                option: {
						                    funnel: {
						                        x: '25%',
						                        width: '50%',
						                        funnelAlign: 'left',
						                        max: 1548
						                    }
						                }
						            },
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    calculable : true,
						    series : [
						        {
						            name:'经验',
						            type:'pie',
						            radius : '55%',
						            center: ['50%', '60%'],
						            data:exp
						        }
						    ]
						};
					var mychart=echarts.init(document.getElementById("exp"),"macarons");
					mychart.setOption(expTotaloption);
				}
			});
//=========================================================================================
			$.ajax({
				type:'post',
				url:'job/finddemandEducation',
				contentType:'application/json;charset=utf-8',
				//数据格式是json串
				data:'{"cityname":"'+cityname+'","name":"'+name+'"}',
				success:function(data){//返回json结果
					if(data==""){
						return ;
					}
					//工作经验和用人需求的关系
					var education=[],name=[];
					for(var i=0;i<data.length;i++){
						var item={
								value:data[i].total, name:data[i].education
						}
						name.push(data[i].education);
						education.push(item);
					}
					educationTotaloption = {
						    title : {
						        text: '学历与用人需求的关系',
						        subtext: '智联招聘',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    legend: {
						        orient : 'vertical',
						        x : 'left',
						        data:name
						    },
						    toolbox: {
						        show : true,
						        feature : {
						            mark : {show: true},
						            dataView : {show: true, readOnly: false},
						            magicType : {
						                show: true, 
						                type: ['pie', 'funnel'],
						                option: {
						                    funnel: {
						                        x: '25%',
						                        width: '50%',
						                        funnelAlign: 'left',
						                        max: 1548
						                    }
						                }
						            },
						            restore : {show: true},
						            saveAsImage : {show: true}
						        }
						    },
						    calculable : true,
						    series : [
						        {
						            name:'学历',
						            type:'pie',
						            radius : '55%',
						            center: ['50%', '60%'],
						            data:education
						        }
						    ]
						};
					var mychart=echarts.init(document.getElementById("education"),"macarons");
					mychart.setOption(educationTotaloption);
				}
			});
		 
		 
		 
		 
		 
		 
	})
})