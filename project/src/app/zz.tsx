import React from "react";
import Slider from "react-slick";

const TopCard = () => {
    return (
        <div className="flex items-center w-[650px] h-[480px] bg-[#ffffffb2] rounded-[52px] p-5 gap-4">
            <div className="w-[371px] h-[371px] bg-[#8181811a] rounded-[52px]">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgURl} alt="Photo" className="w-[482px] h-[482px] rounded-[52px]" />
                */}
            </div>
            
            <div className="flex flex-col max-w-[223px] max-h-[460px] gap-4">
                <h1 className="min-h-[45px] text-[30px] text-[#6C9441] overflow-y-hidden">title</h1>
                <hr className="w-full bg-black"/>
                <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...</div>
                <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ</div>
                
                <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                </div>

                <div className="mt-2 flex items-center gap-1">
                    <div className="w-[57px] h-[57px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                        */}
                    </div>
                    <div className="flex-col">
                        <div className="text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-[20px] text-[#000000b2]">username</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="flex items-center justify-center">
        <Slider {...settings} className="SliderCSS">
            <TopCard />
            <TopCard />
            <TopCard />
        </Slider>
    </div>
  );
}