/* ===========================
   KIAAN ETO - STYLE PART 1
=========================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#ffffff;
    color:#222;
    overflow-x:hidden;
}

.container{
    width:90%;
    max-width:1200px;
    margin:auto;
}

/* Header */

.header{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    background:#ffffff;
    box-shadow:0 2px 12px rgba(0,0,0,.08);
    z-index:999;
}

.header .container{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:18px 0;
}

.header h2{
    color:#004ea2;
    font-size:30px;
    font-weight:bold;
}

nav a{
    text-decoration:none;
    margin:0 15px;
    color:#222;
    font-weight:600;
    transition:.3s;
}

nav a:hover{
    color:#0057b8;
}

.btn{
    background:#0057b8;
    color:white;
    text-decoration:none;
    padding:12px 24px;
    border-radius:8px;
    font-weight:bold;
}

/* Hero Section */

.hero{
    margin-top:90px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    min-height:650px;
    padding:60px 8%;
    background:linear-gradient(135deg,#ffffff,#eef5ff);
}

.hero-left{
    width:48%;
}

.hero-right{
    width:48%;
}

.tag{
    display:inline-block;
    background:#0d5bc8;
    color:white;
    padding:10px 18px;
    border-radius:25px;
    margin-bottom:25px;
    font-size:14px;
}

.hero h1{
    font-size:64px;
    color:#003f91;
    line-height:1.1;
    margin-bottom:20px;
}

.hero p{
    font-size:20px;
    line-height:1.8;
    color:#555;
    margin-bottom:30px;
}

.call-btn,
.whatsapp-btn{

    display:inline-block;
    text-decoration:none;
    color:white;
    padding:14px 28px;
    border-radius:8px;
    margin-right:15px;
    font-weight:bold;
}

.call-btn{
    background:#0057b8;
}

.whatsapp-btn{
    background:#18b857;
}

/* Responsive */

@media(max-width:900px){

.header .container{
flex-direction:column;
}

nav{
margin:20px 0;
}

.hero{
flex-direction:column;
text-align:center;
}

.hero-left,
.hero-right{
width:100%;
}

.hero h1{
font-size:42px;
}

}