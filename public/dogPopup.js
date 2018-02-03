function getdogPopupString(doggoName,picURL,doggoHref,ownerURL){
return `<div class="container">
	<div class="row">
		<div class="col-lg-3 col-sm-6">

            <div class="card hovercard" style="overflow: hidden; margin: 0 auto;">
                <div class="cardheader">

                </div>
                <div class="avatar">
                    <img alt="" src="${picURL}" width=150 height=150>
                </div>
                <div class="info">
                    <div class="title">
                        <a target="_blank" href="${doggoHref}">${doggoName}</a>
                    </div>
                    <div class="desc">Lovely Doggo</div>
                    <div class="desc">Cutie Pie</div>
                    <div class="desc">Tech Nerd</div>
                </div>
                <div class="bottom">
                    <a  href="${ownerURL}">
                        My Owner!
                    </a>
                </div>
            </div>

        </div>

	</div>
</div>`;
}
