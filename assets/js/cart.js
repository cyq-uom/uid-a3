window.onload = function() {
    var aData = [	{
			"imgUrl": "assets/img/flightless fruit flies.png",
			"proName": " Flightless Fruit Flies",
			"proPrice": "20.00",
			"proComm": "9.7"
		}];
    var oBox = document.getElementById("box");
    var oCar = document.getElementById("car");
    var oUl = document.getElementsByTagName("ol")[0];

    for (var i = 0; i < aData.length; i++) {
        var oLi = document.createElement("li");
        var data = aData[i];

        oLi.innerHTML += '<div class="pro_img"><img src="' + data["imgUrl"] + '" width="150" height="150"></div>';
        oLi.innerHTML += '<h3 class="pro_name"><a href="#">' + data["proName"] + '</a></h3>';
        oLi.innerHTML += '<p class="pro_price">' + data["proPrice"] + ' AUD</p>';
        oLi.innerHTML += '<div class="add_btn">Add to Cart</div>';
        oUl.appendChild(oLi);

    }
    var aBtn = getClass(oBox, "add_btn"); //check how many selected
    var number = 0; //return select 0 in cart o 0
    for (var i = 0; i < aBtn.length; i++) {
        number++;
        aBtn[i].index = i;
        aBtn[i].onclick = function() {
            var oDiv = document.createElement("div");
            var data = aData[this.index];
            oDiv.className = "row hid";
            oDiv.innerHTML += '<div class="check left"> <i class="i_check" id="i_check" onclick="i_check()" >√</i></div>';
            oDiv.innerHTML += '<div class="img left"><img src="' + data["imgUrl"] + '" width="80" height="80"></div>';
            oDiv.innerHTML += '<div class="name left"><span>' + data["proName"] + '</span></div>';
            oDiv.innerHTML += '<div class="price left"><span>' + data["proPrice"] + ' AUD</span></div>';
            oDiv.innerHTML += ' <div class="item_count_i"><div class="num_count"><div class="count_d">-</div><div class="c_num">1</div><div class="count_i">+</div></div> </div>'
            oDiv.innerHTML += '<div class="subtotal left"><span>' + data["proPrice"] + ' AUD</span></div>'
            oDiv.innerHTML += '<div class="ctrl left"><a href="javascript:;">×</a></div>';
            oCar.appendChild(oDiv);
            var flag = true;
            var check = oDiv.firstChild.getElementsByTagName("i")[0];
            check.onclick = function() {
                // console.log(check.className);
                if (check.className == "i_check i_acity") {
                    check.classList.remove("i_acity");

                } else {
                    check.classList.add("i_acity");
                }
                getAmount();
            }
            var delBtn = oDiv.lastChild.getElementsByTagName("a")[0];
            delBtn.onclick = function() {
                var result = confirm("Confirm your deletion?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }
            var i_btn = document.getElementsByClassName("count_i");
            for (var k = 0; k < i_btn.length; k++) {
                i_btn[k].onclick = function() {
                    bt = this;
                    at = this.parentElement.parentElement.nextElementSibling;
                    pt = this.parentElement.parentElement.previousElementSibling;
                    node = bt.parentNode.childNodes[1];
                    console.log(node);
                    num = node.innerText;
                    num = parseInt(num);
                    num++;
                    node.innerText = num;
                    price = pt.innerText;
                    price = price.substring(0, price.length - 1);
                    at.innerText = price * num + " AUD";
                    getAmount();
                }
            }
            var d_btn = document.getElementsByClassName("count_d");
            for (k = 0; k < i_btn.length; k++) {
                d_btn[k].onclick = function() {
                    bt = this;
                    at = this.parentElement.parentElement.nextElementSibling;
                    pt = this.parentElement.parentElement.previousElementSibling;
                    node = bt.parentNode.childNodes[1];
                    num = node.innerText;
                    num = parseInt(num);
                    if (num > 1) {
                        num--;
                    }
                    node.innerText = num;
                    price = pt.innerText;
                    price = price.substring(0, price.length - 1);
                    at.innerText = price * num + " AUD";
                    getAmount();
                }
            }

            delBtn.onclick = function() {
                var result = confirm("Confirm your deletion?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }

        }
    }

}

function getClass(oBox, tagname) {
    var aTag = oBox.getElementsByTagName("*");
    var aBox = [];
    for (var i = 0; i < aTag.length; i++) {
        if (aTag[i].className == tagname) {
            aBox.push(aTag[i]);
        }
    }
    return aBox;
}


var index = false;

function checkAll() {
    var choose = document.getElementById("car").getElementsByTagName("i");
    if (choose.length != 1) {
        for (i = 1; i < choose.length; i++) {
            if (!index) {
                choose[0].classList.add("i_acity2")
                choose[i].classList.add("i_acity");
            } else {
                choose[i].classList.remove("i_acity");
                choose[0].classList.remove("i_acity2")
            }
        }
        index = !index;
    }
    getAmount();
}


function getAmount() {
    ns = document.getElementsByClassName("i_acity");
    console.log(ns);
    sum = 0;
    document.getElementById("price_num").innerText = sum;
    for (y = 0; y < ns.length; y++) {
        amount_info = ns[y].parentElement.parentElement.lastElementChild.previousElementSibling;
        num = parseInt(amount_info.innerText);
        sum += num;
        document.getElementById("price_num").innerText = sum;
    }
}

document.addEventListener("DOMContentLoaded", function() {
			var payBtn = document.getElementById("pay");
			var priceNum = document.getElementById("price_num");

			checkPriceAndTogglePayButton();
		
			// money update
			var priceObserver = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					checkPriceAndTogglePayButton();
				});
			});
		
			var priceConfig = {
				childList: true,
				subtree: true
			};
			priceObserver.observe(priceNum, priceConfig);
		
			function checkPriceAndTogglePayButton() {
				var price = parseFloat(priceNum.innerText);
				if (price === 0) {
					disablePayButton();
				} else {
					enablePayButton();
				}
			}
		
			function disablePayButton() {
				payBtn.style.backgroundColor = "#ccc";
				payBtn.disabled = true;
			}
		
			function enablePayButton() {
				payBtn.style.backgroundColor = "#4a8c68"; // recover button color
				payBtn.disabled = false;
			}
		
			payBtn.addEventListener("click", function() {
				checkPriceAndTogglePayButton();
				if (!payBtn.disabled) {
					payBtn.innerHTML = "Continuing";
					payBtn.disabled = true; // disable multi click error
					setTimeout(function() {
						// jump
						window.location.href = "your_destination_url";
					}, 5000); // 5 seconds
				}
			});
		});
		
		
		
		