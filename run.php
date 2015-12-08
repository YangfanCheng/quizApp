<?php

include("../IT202/account.php");

$conn= mysqli_connect($hostname, $username, $password) or die ("failed to connect");
mysqli_select_db($conn, $dbname) or die ("datebase not found");

$name = $_GET['name'];
$pts = $_GET['pts'];
$checkquery = "SELECT * FROM rank WHERE user = '$name'";
$result = $conn->query($checkquery);
if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $score = $row['score'];
    if($score < $pts){
        $sql = "UPDATE rank SET score='$pts' WHERE user='$name'";
        if ($conn->query($sql) === TRUE) {
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
}else{
    $sql = "INSERT INTO rank (user, score) VALUES ('$name', '$pts')";
    if ($conn->query($sql) === TRUE) {
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$query = "SELECT * FROM rank ORDER BY score DESC";
$rank = 0;
$output = $conn->query($query);
if($output->num_rows > 0){
    while($row = $output->fetch_assoc()){
        $rank += 1;
        echo "<tr><td>" . $row['user']. "</td><td>" . $row['score']. "</td><td>".$rank."</td></tr>";
    }
}else{
    echo "<tr><td>error</td><tr>";
}
$conn->close();
?>