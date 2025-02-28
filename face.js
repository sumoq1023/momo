alert("来吧展示！");
// 轮播图功能

let slideIndex = 0;/*下标*/ 
let timer;/*定时器*/

/*函数定义*/
function displaySlide() {
    const slides = document.querySelectorAll('.carousel-item');//该类的所有元素集合成一个数组
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';/*隐藏全部元素*/
    }
    if (slideIndex >= slides.length) slideIndex = 0;//返回第一张
    if (slideIndex < 0) slideIndex = slides.length - 1;//返回最后一张
    slides[slideIndex].style.display = 'block';/*显示元素，因为全部隐藏，已经设置下标，则默认显示第一张0下标*/
}

//启动一个定时器，每隔3秒自动切换到下一张图片
function startAutoSlide() {
    timer = setInterval(() => {
        slideIndex++;
        displaySlide();
    }, 3000);
}

function prevSlide() {
    slideIndex--;//上一张的
    displaySlide();
    clearInterval(timer);//清除定时器
    startAutoSlide();/* 重新启动自动轮播 */
}

function nextSlide() {
    slideIndex++;//下一张的
    displaySlide();
    clearInterval(timer);//清除定时器
    startAutoSlide();/* 重新启动自动轮播 */
}



displaySlide();//初始化默认
startAutoSlide();//自动播放

// 图片上传和人脸检测
document.getElementById('detectFaceButton').addEventListener('click', function () {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('请选择一张图片');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('api_key', '_tuBxGqGx7ImJPiVKVeOTJj-_KhGG3Up'); //Face++ API Key
    formData.append('api_secret', '1n_L7hEVN1J7vW15kmKCfhPAfVISUPiH'); //Face++ API Secret

    $.ajax({
        url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
        method: 'POST',
        data: formData,
        //告诉 jQuery 不要处理发送的数据
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.faces && response.faces.length > 0) {
                document.getElementById('detectionResult').innerText = `检测到人脸，数量：${response.faces.length}`;
            } else {
                document.getElementById('detectionResult').innerText = '未检测到人脸';
            }
        },
        error: function (error) {
            console.error('检测失败：', error);
            document.getElementById('detectionResult').innerText = '检测失败，请重试';
        }
    });
});