const express = require("express");
const readLastLines = require('read-last-lines');
const port = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

let serverA = false;
let serverB = false;
let time = '';

setInterval(() => {
	readLastLines.read('log.txt', 5).then((lines) => {
		let data = lines.split('\n');
		for (var i = 0; i < data.length; i++) {
			if (data[i] == 'Server1') {
				if (data[i + 1] === '')
					serverA = 'DOWN';
				else
					serverA = 'UP';
				i++;
			} else if (data[i] == 'Server2') {
				if (data[i + 1] === '')
					serverB = 'DOWN';
				else
					serverB = 'UP';
				i++;
			} else if (data[i].includes('TIME')) {
				time = data[i];
			} else {
				i++;
			}
		}
	});
}, 1000);


app.get("/info", (req, res) =>{

	mensaje = {
		"serverA" : serverA,
		"serverB" : serverB
	}

	res.json(mensaje);
});

app.get("/", (req, res) => {
	res.send(
	`<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Monitoring</title>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
			integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	</head>
	
	<body>
	
		<style>
			body {
				font: normal 16px/1.5 'Roboto', sans-serif;
				background: #f1f1f1;
			}
	
			.status {
				margin-top: 150px;
			}
	
			/* RESET STYLES
		–––––––––––––––––––––––––––––––––––––––––––––––––– */
	
			.chart-skills {
				margin: 0 auto;
				padding: 0;
				list-style-type: none;
			}
	
			.chart-skills *,
			.chart-skills::before {
				box-sizing: border-box;
			}
	
	
			/* CHART-SKILLS STYLES
		–––––––––––––––––––––––––––––––––––––––––––––––––– */
	
			.chart-skills {
				position: relative;
				width: 350px;
				height: 175px;
				overflow: hidden;
			}
	
			.chart-skills::before,
			.chart-skills::after {
				position: absolute;
			}
	
			.chart-skills::before {
				content: '';
				width: inherit;
				height: inherit;
				border: 45px solid rgba(211, 211, 211, .3);
				border-bottom: none;
				border-top-left-radius: 175px;
				border-top-right-radius: 175px;
			}
	
			.chart-skills::after {
				content: 'STATUS';
				left: 50%;
				bottom: 10px;
				transform: translateX(-50%);
				font-size: 1.1rem;
				font-weight: bold;
				color: cadetblue;
			}
	
			.chart-skills li {
				position: absolute;
				top: 100%;
				left: 0;
				width: inherit;
				height: inherit;
				border: 45px solid;
				border-top: none;
				border-bottom-left-radius: 175px;
				border-bottom-right-radius: 175px;
				transform-origin: 50% 0;
				transform-style: preserve-3d;
				backface-visibility: hidden;
				animation-fill-mode: forwards;
				animation-duration: .4s;
				animation-timing-function: linear;
			}
	
			.chart-skills li:nth-child(1) {
				z-index: 2;
				border-color: firebrick;
				animation-name: rotate-one;
			}
	
			.chart-skills li:nth-child(2) {
				z-index: 1;
				border-color: green;
				animation-name: rotate-two;
				animation-delay: .5s;
			}
	
			.chart-skills span {
				position: absolute;
				font-size: .85rem;
				backface-visibility: hidden;
				animation: fade-in .4s linear forwards;
			}
	
			.chart-skills li:nth-child(1) span {
				top: 80px;
				left: 75px;
				transform: rotate(270deg);
			}
	
			.chart-skills li:nth-child(2) span {
				top: 20px;
				left: 10px;
				transform: rotate(-180deg);
				animation-delay: .4s;
			}
	
	
	
	
			/* ANIMATIONS
		–––––––––––––––––––––––––––––––––––––––––––––––––– */
	
			@keyframes rotate-one {
				100% {
					transform: rotate(90deg);
					/**
			 * 12% => 21.6deg
			 */
				}
			}
	
			@keyframes rotate-two {
				0% {
					transform: rotate(90deg);
				}
	
				100% {
					transform: rotate(180deg);
					/**
			 * 32% => 57.6deg 
			 * 57.6 + 21.6 => 79.2deg
			 */
				}
			}
	
	
	
			@keyframes fade-in {
	
				0%,
				90% {
					opacity: 0;
				}
	
				100% {
					opacity: 1;
				}
			}
		</style>
	
		<nav class="navbar navbar-dark bg-dark">
			<a class="navbar-brand" href="#">Monitoring</a>
		</nav>
	
		<div class="container">
			<div class="status">
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Time</th>
							<th scope="col">IP</th>
							<th scope="col">Status</th>
							<th scope="col"></th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Server1</th>
							<td>${time}</td>
							<td>192.168.0.1</td>
							<td id="serverA">UP</td>
							<td><span class="badge badge-success" id="serverA-success">Success</span></td>
							<td><button type="button" class="btn btn-dark">Reboot</button></td>
						</tr>
						<tr>
							<th scope="row">Server2</th>
							<td>${time}</td>
							<td>192.168.0.1</td>
							<td id="serverB">UP</td>
							<td><span class="badge badge-success" id="serverB-success">Success</span></td>
							<td><button type="button" class="btn btn-dark">Reboot</button></td>
						</tr>
	
					</tbody>
				</table>
			</div>
	
	
			<div class="status">
				<ul class="chart-skills">
					<li>
						<span>Server1</span>
					</li>
					<li>
						<span>Server2</span>
					</li>
				</ul>
			</div>
		</div>
	
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
			integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
			crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
			crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js"
			integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
		<script>
			$(document).ready(function () {
	
				$.ajax({
					url: '192.168.1.156:5000/info',
					type: "GET",
					success: function (res) {
						if (res.serverA === 'UP') {
							console.log("lol");
							$("#serverA").replaceWith("<td id='serverA'>Server OK</td>");
							$("#serverA-success").replaceWith("<span class='badge badge-success' id='serverA-success'>Success</span>");
							$(".chart-skills li:nth-child(1)").css("border-color", "green");
						} else {
							$("#serverA").replaceWith("<td id='serverA'>Server Caído</td>");
							$("#serverA-success").replaceWith("<span class='badge badge-danger' id='serverA-success'>DOWN</span>");
							$(".chart-skills li:nth-child(1)").css("border-color", "firebrick");
						}
	
	
						if (res.serverB === 'UP') {
							$("#serverB").replaceWith("<td id='serverB'>Server OK</td>");
							$("#serverB-success").replaceWith("<span class='badge badge-success' id='serverB-success'>Success</span>");
							$(".chart-skills li:nth-child(2)").css("border-color", "green");
						} else {
							$("#serverB").replaceWith("<td id='serverB'>Server Caído</td>");
							$("#serverB-success").replaceWith("<span class='badge badge-danger' id='serverB-success'>DOWN</span>");
							$(".chart-skills li:nth-child(2)").css("border-color", "firebrick");
						}
	
					},
					error: function () {
						console.error("No es posible completar la operación");
					}
				});
				$('.btn').click(() => {
					console.log("Hola");
				});
			});
		</script>
	</body>
	
	</html>`
	);
});

app.listen(port, () => {
	console.log(`App is listening to port ${port}`);
});