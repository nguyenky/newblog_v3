
<!doctype html>
<html class="no-js" lang="">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Yes ! For me !!!</title>
	<link rel="icon" href="/resources/assets/icon-logo.jpg"/>
	<!-- ------------Defaulf-------------- -->
	<!-- <link rel="stylesheet" href="resources/assets/public/css/bootstrap.min.css"> -->
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
	
	<link href="resources/assets/font-awesome/css/font-awesome.css" rel="stylesheet">
	<link rel="stylesheet" href="resources/assets/public/css/owl.carousel.css">
	<link rel="stylesheet" href="resources/assets/public/css/owl.theme.css">
	<link rel="stylesheet" href="resources/assets/public/css/transitions.css">
	<link rel="stylesheet" href="resources/assets/public/css/main.css">
	<link rel="stylesheet" href="resources/assets/public/css/responsive.css">
	<script src="resources/assets/public/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
	<!-- --------Defaulf------------ -->
</head>
<body data-ng-app="app" ng-controller="MyAppCtrl">
	<div id="sliding" class="sliding">
		<div class="container">
			<a href="" class="show_hide fa fa-close pull-right"></a>
			<form class="header-search-form">
				<fieldset>
					<input type="text" class="form-control" placeholder="Search here...">
				</fieldset>
			</form>
		</div>
	</div>
	<div id="wrapper">
		<header id="header" class="tg-header haslayout">
			<div class="topbar haslayout">
				<div class="container">
					<div class="new-slides display_none pull-left col-lg-6 col-md-7 col-sm-8 col-xs-8 display-news" style="{{latest.length ? 'display: block !important;' : ''}}">
						<div id="news-slider">
							<div class="item">
								<a href="" ng-click="redirec(latest[0])"><p>{{latest[0].name | limitTo:50}}</p></a>
							</div>
							<div class="item">
								<a href="" ng-click="redirec(latest[1])"><p>{{latest[1].name | limitTo:50}}</p></a>
							</div>
							<div class="item">
								<a href="" ng-click="redirec(latest[2])"><p>{{latest[2].name | limitTo:50}}</p></a>
							</div>
							<div class="item">
								<a href="" ng-click="redirec(latest[3])"><p>{{latest[3].name | limitTo:50}}</p></a>
							</div>
							<div class="item">
								<a href="" ng-click="redirec(latest[4])"><p>{{latest[4].name | limitTo:50}}</p></a>
							</div>
						</div>
					</div>
					<div class="search-social pull-right text-center">
						<div class="avatar-user" ng-show="loginStatus">
							<div class="name-user display_none" style="{{userLogin.name ? 'display: inline; !important;' : ''}}">
								<a href="" ng-click="logout()">{{userLogin.name}}</a>
							</div>
							<img ng-src="{{userLogin.avatar}}" width="40" height="40" ng-show='loginStatus'>
						</div>
						<ul class="social-icon" ng-show="!loginStatus">
							<li ><a href="" ng-click="login()"><i class="fa fa-facebook"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
			<div class="container">
				<div class="logo-box haslayout">
					<strong class="logo">
						<a  ui-sref="/home">
							<img src="resources/assets/public/images/yesforme.jpg" alt="The Success BLOG for Real LifeStyle">
						</a>
					</strong>
				</div>
				<div class="text-center" ng-show="showPosts" style="margin-bottom: 1em;"">
					<div ng-bind-html="trustAsHtml((postMain.caption))"></div>
				</div>
			</div>
			<nav id="nav" class="navbar navbar-default">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li>
								<a ui-sref="/home">Home</a>
							</li>
							<li><a ui-sref="life">LifeStyle</a></li>
							<li><a ui-sref="trip">Trip</a></li>
							<li><a ui-sref="audio">Just Relax</a></li>
							<li><a ui-sref="playlists">Playlists</a></li>
							<li><a ui-sref="video">Videos</a></li>
							<li><a ui-sref="history">Yes ! I write !</a></li>
							<li><a ui-sref="historycollected">History in my eye</a></li>
							<li><a ui-sref="images">Images</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
		<div class="tg-banner haslayout">
			<div class="container" ng-show="showPosts">
				<div id="home-slider" class="home-slider">
					<div class="item">
						<div class="tg-banner-poststyle">
							<figure>
								<a href="">
									<img ng-src="{{postMain.url ? postMain.url : 'storage/app/public/default.jpg'}}" alt="image description">
								</a>
							</figure>
						</div>
					</div>
				</div>
				<div class="tg-newsupdate">
				</div>
				<div id="categories-slider" class="tg-categories">
					<div class="item">
						<div class="tg-category">
							<figure>
								<a href="">
									<img ng-src="{{postExtra1.url ? postExtra1.url : 'storage/app/public/default.jpg'}}" alt="image description">
								</a>
							</figure>
							<div class="category-content">
								<div class="display-table">
									<div class="display-table-cell">
										<div class="post-meta">
											<span><a href="">LifeStyle</a></span>
											<span>{{ postExtra1.created_at | amCalendar:referenceTime:formats}}</span>
										</div>
										<div class="description  post-meta" style="max-height: 70px; overflow: hide;">
											<div ng-bind-html="trustAsHtml((postExtra1.caption | limitTo:200))"></div>
										</div>
										<div class="post-meta no-padding">
											<span>
												<a href="">
													<i class="fa fa-user"></i>
													<em>Ng Ký Lê</em>
												</a>
											</span>
											<span>
												<a href="">
													<i class="fa fa-comment"></i>
													<em>No Comments Yet</em>
												</a>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="tg-category">
							<figure>
								<a href="">
									<img ng-src="{{postExtra2.url ? postExtra2.url : 'storage/app/public/default.jpg'}}" alt="image description">
								</a>
							</figure>
							<div class="category-content">
								<div class="display-table">
									<div class="display-table-cell">
										<div class="post-meta">
											<span><a href="">LifeStyle</a></span>
											<span>{{ postExtra2.created_at | amCalendar:referenceTime:formats}}</span>
										</div>
										<div class="description  post-meta" style="max-height: 70px; overflow: hide;">
											<div ng-bind-html="trustAsHtml((postExtra2.caption | limitTo:200))"></div>
										</div>
										<div class="post-meta no-padding">
											<span>
												<a href="">
													<i class="fa fa-user"></i>
													<em>Ng Ký Lê</em>
												</a>
											</span>
											<span>
												<a href="">
													<i class="fa fa-comment"></i>
													<em>No Comments Yet</em>
												</a>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="tg-category">
							<figure>
								<a href="">
									<img ng-src="{{postExtra3.url ? postExtra3.url : 'storage/app/public/default.jpg'}}" alt="image description">
								</a>
							</figure>
							<div class="category-content">
								<div class="display-table">
									<div class="display-table-cell">
										<div class="post-meta">
											<span><a href="">LifeStyle</a></span>
											<span>{{ postExtra3.created_at | amCalendar:referenceTime:formats}}</span>
										</div>
										<div class="description  post-meta" style="max-height: 70px; overflow: hide;">
											<div ng-bind-html="trustAsHtml((postExtra3.caption | limitTo:200))"></div>
										</div>
										<div class="post-meta no-padding">
											<span>
												<a href="">
													<i class="fa fa-user"></i>
													<em>Ng Ký Lê</em>
												</a>
											</span>
											<span>
												<a href="">
													<i class="fa fa-comment"></i>
													<em>No Comments Yet</em>
												</a>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<main id="main" class="haslayout">
			<div id="twocolumns" class="container">
				<div class="row">
					<div data-ui-view="">
						<div id="content" class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
							<div class="text-center">
								<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
							</div>
						</div>
					</div>
					<aside id="sidebar" class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
						<div class="row">
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width">
								<div class="tg-widget">
									<h4><span>about me</span></h4>
									<div class="about-widget display_none" style="{{profile ? 'display: block !important;' : ''}}" >
										<div class="author-img">
											<img ng-src="{{profile.url}}" alt="image description"> 
										</div>
										<div class="description">
											{{profile.preview}}
										</div>
										<a class="tg-btn-countinuereading" href="https://www.facebook.com/ky.nguyenkyle" target="_blank">more infomation</a>
									</div>
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" style="{{instagrams.length ? 'display: block !important;' : ''}}">
								<div class="tg-widget add">
									<img ng-src="{{instagrams[0].images.standard_resolution.url}}" alt="image description">
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" style="{{instagrams.length ? 'display: block !important;' : ''}}">
								<div class="tg-widget tg-recent-post">
									<h4><span>Recent post</span></h4>
									<div class="recent-post">
										<ul>
											<li ng-repeat="instagram in instagrams| limitTo:4" ng-show="$index >0">
												<div class="post-thumb">
													<a href="{{instagram.link}}" target="_blank">
														<img ng-src="{{instagram.images.standard_resolution.url}}" alt="image description">
													</a>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" style="{{instagrams.length ? 'display: block !important;' : ''}}">
								<div class="tg-widget tg-instagram">
									<h4><span>Instagram</span></h4>
									<ul class="instagram-plugin">
										<li ng-repeat="instagram in instagrams  | limitTo:13" ng-show="$index >3">
											<a href="{{instagram.link}}" target="_blank"><img ng-src="{{instagram.images.thumbnail.url}}" alt="image description"></a>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" style="{{instagrams.length ? 'display: block !important;' : ''}}">
								<div class="tg-widget tg-search">
									<form class="tg-search-form">
										<fieldset>
											<input type="search" name="search" class="form-control" placeholder="Search Here..." ng-model='searchWord'>
											<button type="submit" ng-click="search(1)"><i class="fa fa-search"></i></button>
										</fieldset>
									</form>
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" style="{{instagrams.length ? 'display: block !important;' : ''}}">
								<div class="tg-widget tg-category">
									<h4><span>Blog Catagories</span></h4>
									<ul class="blog-category">
										<li ng-repeat="cat in categories" ng-show="cat.count!=0">
											<a href="" ng-click="redirectCategory(cat)">
												<em>{{cat.name}}</em>
												<i>({{cat.count}})</i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width display_none" ng-show="showSearch">
								<div class="tg-widget tg-category">
									<h4><span>Posts Search</span></h4>

									<ul class="blog-category" ng-show="searchNews.length && !loadingSearch">
										<li ng-repeat="news in searchNews">
											<a href="" ng-click="redirec(news)" class="pull-left">
												<em>{{news.name}}</em>
											</a>
										</li>
									</ul>
									<div class="text-center" ng-show="!searchNews.length && !loadingSearch"> Can not find any posts with name like "{{searchWord}}" !!!</div>
									<div class="text-center" ng-show="loadingSearch"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
									<div style="border-top: 1px solid;"  ng-show="searchNews.length ">
										<a class="pull-left" href="" ng-click="previus()" ng-show="hasPrevius">Previus</a> 
										<a class="pull-right" href="" ng-click="loadMore()" ng-show="hasLoadMoreSearch">Load more posts</a> 
									</div>
								</div>
							</div>
							
						</div>
					</aside>
				</div>
			</div>
		</main>
		<footer id="footer" class="haslayout">
			<div class="plugin-instagram">
				<div class="container-fluid">
					<div class="row">
						<h4><a href="https://www.instagram.com/_ky.lenguyen_/"  target="_blank">Media On Instagram</a></h4>
						<div id="instagram-gallery" class="instagram-gallery">
							<div class="item" ng-repeat="instagram in instagrams  | limitTo:20" ng-show="$index >12"><a href="{{instagram.link}}" target="_blank"><img ng-src="{{instagram.images.thumbnail.url}}"></a></div>
						</div>
					</div>
				</div>
			</div>
			<div class="three-columns">
				<div class="container">
					<div class="row">
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 box-width">
							<div class="box">
								<h5>This page </h5>
								<div class="description display_none" style="{{profile ? 'display: block !important;' : ''}}">
									<p>
										{{profile.about}}
									</p>
								</div>
								<ul class="social-icon">
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-instagram"></i></a></li>
									<li><a href=""><i class="fa fa-pinterest-p"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-tumblr"></i></a></li>
								</ul>
							</div>
						</div>
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 box-width">
							<div class="box">
								<h5>Contact</h5>
								<div class="instagram">
									<div class="description">
										<p>Want to send me a message ?? Let's enter the content on "Here ! This here !" !!</p>
										<p>You also want to talking about history ?? Yeah welcomed, let's enter the content on "Here ! This here !" and "Send" for me, your article will appear on my page, and do not forget to leave your name and email ! You are always welcomed !!!</p>
									</div>
									<form class="form-newsletter" name='contact'>
										<fieldset>
											<div class="form-group"><input type="text" name="name" class="form-control" placeholder="Your Name" ng-model="contact.name" required></div>
											<div class="form-group"><input type="text" name="email" class="form-control" placeholder="Email Address" ng-model="contact.email" required></div>
										</fieldset>
									</form>
									<div class="error" ng-show ="errorContact">
										<h5>Warning !!!!</h5>
										<p> No no ! Make sure you had enter the 'Name' , 'Email' or 'Content', let's check  now !!   </p>
									</div>
									<div class="success" ng-show ="successContact">
										<h5>Success !!!!</h5>
										<p> Yeah !! thank you for that !! I will check as soon as possible and respond for you !!</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 box-width">
							<div class="box" id="contact">
								<h5>Here ! This Here !</h5>
								<form class="form-newsletter" name='contact'>
									<fieldset>
										<div class="form-group"><textarea class="form-control" placeholder="Your message" ng-model="contact.message" required></textarea></div>
										<div class="form-group"><button type="submit" ng-click="sendContact()">Send</button></div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="copyright">
				<div class="container">
					<p>Copyright &copy; 2017 - Author : Ng Ký Lê</p>
				</div>
			</div>
		</footer>
	</div>

	<script src="resources/assets/admin/js/bootstrap/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="resources/assets/admin/js/bootstrap/bootstrap.min.js"></script>
    <!-- Angular -->
    <script src="resources/assets/storage/angular/angular.js"></script>
    <script src="resources/assets/storage/angular-ui-router/angular-ui-router.min.js"></script>
    <script src="resources/assets/storage/oclazyload/ocLazyLoad.min.js"></script>
    <script src="resources/assets/storage/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="resources/assets/storage/angular-moment/moment.js"></script>
    <script src="resources/assets/storage/angular-moment/angular-moment.min.js"></script>
    <script src="resources/assets/storage/underscore/underscore-min.js"></script>
    <script src="resources/assets/admin/js/modules/underscore.js"></script>
    <!-- ------ -->
    <script src="resources/assets/storage/facebook/angular-facebook.js"></script>
    <script src="resources/assets/storage/localstorage/ngStorage.js"></script>

    <!-- End Angular  -->
	<script src="resources/assets/public/angularjs/app.js"></script>
	<script src="resources/assets/public/angularjs/config.lazyload.js"></script>
	<script src="resources/assets/public/angularjs/config-public.js"></script>
	<script src="resources/assets/public/angularjs/service.js"></script>
	<script src="resources/assets/public/angularjs/main.js"></script>
	
	
    <!-- main -->
    <!-- End main -->
	<!---------- Defaulf ---------->
	<script src="resources/assets/public/js/owl.carousel.js"></script>
	<script src="resources/assets/public/js/isotope.pkgd.min.js"></script>
	<script src="resources/assets/public/js/isotop.js"></script>
	<script src="resources/assets/public/js/theia-sticky-sidebar.js"></script>
	<script src="resources/assets/public/js/main.js"></script>
	<!-- ------------End defaulf---------- -->
</body>
</html>