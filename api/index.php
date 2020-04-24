<?php
$type = $_GET['tp'];
// var_dump($_GET);
// die;
if ($type == 'signup') {
    signup();
} elseif ($type == 'login') {
    login();
} elseif ($type == 'feed') {
    feed();
} elseif ($type == 'feedUpdate') {
    feedUpdate();
} elseif ($type == 'feedDelete') {
    feedDelete();
}

function login()
{
    require 'config.php';
    // echo 'here:' . file_get_contents('php://input');
    // die;
    $json = json_decode(file_get_contents('php://input'), true);
    // die;
    $email = $json['email'];
    $password = $json['password'];
    // print_r($email);
    $userData = '';
    if ($email != "") {
        $query = "select * from users where email='$email' and password='$password'";
        $result = $db->query($query);
        // print_r($result);
        $rowCount = $result->num_rows;

        if ($rowCount > 0) {
            $userData = $result->fetch_object();
            $user_id = $userData->user_id;
            $userData = json_encode($userData);
            echo '{"userData":' . $userData . '}';
        } else {
            echo '{"error":"Wrong email or password"}';
        }
    } else {
        echo "email should not be empty";
    }

}

function signup()
{
    require 'config.php';
    // echo file_get_contents('php://input');
    $json = json_decode(file_get_contents('php://input'), true);
    $username = $json['username'];
    $password = $json['password'];
    $email = $json['email'];
    // var_dump($username);
    // die;
    $username_check = preg_match("/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i", $username);
    $email_check = preg_match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i', $email);
    $password_check = preg_match('/^[A-Za-z0-9!@#$%^&*()_]{4,20}$/i', $password);

    if ($username_check == 0) {
        echo '{"error":"Invalid username"}';
    } elseif ($email_check == 0) {
        echo '{"error":"Invalid email"}';
    } elseif ($password_check == 0) {
        echo '{"error":"Invalid password"}';
    } elseif (strlen(trim($username)) > 0 && strlen(trim($password)) > 0 && strlen(trim($email)) > 0 &&
        $email_check > 0 && $username_check > 0 && $password_check > 0) {

        $userData = '';

        $result = $db->query("select * from users where username='$username' or email='$email'");
        $rowCount = $result->num_rows;
        //echo '{"text": "'.$rowCount.'"}';

        if ($rowCount == 0) {

            $db->query("INSERT INTO users(username,password,email)
                            VALUES('$username','$password','$email')");

            $userData = '';
            $query = "select * from users where username='$username' and password='$password'";
            $result = $db->query($query);
            $userData = $result->fetch_object();
            $user_id = $userData->user_id;
            $userData = json_encode($userData);
            echo '{"userData":' . $userData . '}';
        } else {
            echo '{"error":"username or email exists"}';
        }

    } else {
        echo '{"text":"Enter valid data2"}';
    }

}

function feed()
{

    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id = $json['user_id'];

    $query = "SELECT * FROM feed WHERE user_id=$user_id ORDER BY feed_id DESC LIMIT 10";
    //$query = "SELECT * FROM feed ";
    $result = $db->query($query);

    $feedData = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $feedData = json_encode($feedData);

    echo '{"feedData":' . $feedData . '}';

}

function feedUpdate()
{

    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id = $json['user_id'];
    $feed = $json['feed'];

    $feedData = '';
    if ($user_id != 0) {
        $query = "INSERT INTO feed ( feed, user_id) VALUES ('$feed','$user_id')";
        $db->query($query);
    }
    $query = "SELECT * FROM feed WHERE user_id=$user_id ORDER BY feed_id DESC LIMIT 10";
    $result = $db->query($query);

    $feedData = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $feedData = json_encode($feedData);

    echo '{"feedData":' . $feedData . '}';

}

function feedDelete()
{
    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id = $json['user_id'];
    $feed_id = $json['feed_id'];

    $query = "Delete FROM feed WHERE user_id=$user_id AND feed_id=$feed_id";
    $result = $db->query($query);
    if ($result) {
        echo '{"success":"Feed deleted"}';
    } else {

        echo '{"error":"Delete error"}';
    }

}