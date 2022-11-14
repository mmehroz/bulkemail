<!DOCTYPE html>
<html lang="en">
<!-- 
avidhaus.ahmer@gmail.com
-->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <section id="app">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <form action="./sendgrid module/send-email.php" id="emial-form" action="post">
                        <div class="form-group">
                            <label for="">Subject</label>
                            <input type="text" name="" id="email-subject" class="form-control" placeholder="Subject">
                        </div>
                        <div class="form-group">
                            <label for="">Email List (Separate Email By Space or Line Break)</label>
                            <textarea type="text" name="" id="email-box" class="form-control" placeholder="Separate Email By Space"></textarea>
                        </div>
                        <div class="input-group">
                            <label class="input-group-text" for="upload-email-template">Upload</label>
                            <input type="file" class="form-control" id="upload-email-template">
                        </div>
                        <input id="send-email-button" type="button" class="btn btn-primary mt-3" value="Send Email" />
                        <input id="show-email-template" type="button" class="btn btn-primary mt-3" value="Show Template" />
                    </form>
                </div>
                <div class="col-6">
                    <div class="check mt-4" id="check"></div>
                    <div class="progress-area mt-4 d-none" id="progress">
                        <div class="progress-message" id="progress-message">
                            <div>avidhaus.ahmer@gmail.com</div>
                            <div class="loading-container" id="loading-container">
                                <img src="images/loading.gif" alt="loading">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="template">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="close" id="close">X</div>
                    <div>
                        <iframe id="template-iframe" src="" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
<script src="script/main.js"></script>

</html>