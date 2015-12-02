"use strict";

document.observe("dom:loaded", function() 
{
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	
	var images = $$("div#labs img");
	
	//All images become draggable
	for(var i = 0; i < images.length; i++)
	{
		new Draggable(images[i],{revert: true});
	}
	
	//The two main areas become droppable
    Droppables.add("selectpad", {onDrop: labSelect});
	Droppables.add("labs", {onDrop: labSelect});
});

function labSelect(drag, drop, event) 
{
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	
	var ok = true;
	var dropedElements = drop.childElements();
	
	for(var j = 0; j < dropedElements.length; j++)
	{
		if(dropedElements[j].alt == drag.alt)
		{
			j = dropedElements.length;
			ok = false;
		}
	}
	
	if(ok)
	{
		if(drop.id == "selectpad")
		{
			if(drop.childElements().length < 3)
			{
				drop.appendChild(drag);
				//drag.up(0).removeChild(drag); 
				/*It seems that the element removes by itself when it is adding inside the drop element.*/
				
				//We create an <li> element
				var list_element = document.createElement("LI");
				//We store the name of the selected lab into a textNode
				var text = document.createTextNode(drag.alt);
				//We add this textNode inside the <li> element
				list_element.appendChild(text);
				
				//The li element is added into the <ol> list.
				$("selection").appendChild(list_element);
				
				//The setTimeout function enable to make the list_element pulsate 0.5 second after its creation.
				setTimeout(function() 
				{
					list_element.pulsate({ pulses: 5, duration: 1.0 });
				}, 500);
			}
		}
		else//drop.id must be equal to "labs"
		{
			drop.appendChild(drag);
			
			//We delete the selected lab from the ol list
			var list_elements = $("selection").childElements();
			
			for(var i = 0; i < list_elements.length; i++)
			{
				if(list_elements[i].innerHTML == drag.alt)
				{
					$("selection").removeChild(list_elements[i]);
				}
			}
		}
	}
	
}

