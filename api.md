请求URL：https://aistudio.alibaba-inc.com/api/aiapp/run/dBLyUMmRPox/latest

POST接口

注意header需要加 X-AK 值为 cb7a887f0c5be95aeb08148b358d8fc1

入参：
{
    "empId": "222877",
    "question": "test",
    "sessionId": "123123",
    "stream": false,
    "returnRunLog": false,
    "variableMap": {
        "img": [
            {
                "content": "https://idealab-platform.oss-accelerate.aliyuncs.com/20250912/3ce2d64f-bcf1-4fa1-8782-c9dcf8eedb06_%E8%8B%B1%E6%96%87%E4%BD%9C%E6%96%87%E7%A4%BA%E4%BE%8B02.jpg?Expires=4102329600&OSSAccessKeyId=LTAI5tFJF3QLwHzEmkhLs9dB&Signature=ywAbo2MnIqYgdWbHiRraN3AP9Tc%3D"
            }
        ],
        "grade": {
            "value": "6"
        }
    }
}

empId工号，可以写死就222877（墨樱）
question：输入的问题，目前在走图片识别，可以先固定一个内容比如test
sessionId：这个比较重要，标识一次对话，建议一次请求生成一个UUID来去重
stream：写死false就好，目前用不到
returnRunLog：先写死false，不然返回一大堆内容
variableMap：变量Map，其中img是本次上传的图片地址，固定数组对象，content是图片具体地址，这个很重要，必传；grade是年级，demo可以先固定传一个6就好

出参：
```json
{
    "success": true,
    "errorCode": null,
    "errorMsg": null,
    "data": {
        "stream": false,
        "streamEnd": true,
        "appCode": "dBLyUMmRPox",
        "sessionId": "1231234",
        "messageId": "2132e04717576926738513291e1082",
        "content": "{\"polish\": \"{ \\\"origin\\\": { \\\"title\\\": \\\"My Favorite Season\\\", \\\"content\\\": \\\"My favorite season is spring. In spring, the weather becomes warm and comfortable after the cold winter. Flowers start to bloom, and trees grow green leaves again. I love to go outside and play with my friends in the park. The air feels fresh and clean. Spring is also the season of new beginnings because many animals have babies. I enjoy seeing the colorful butterflies and hearing birds sing. Compared with other seasons, spring makes me feel happy and full of energy. That is why spring is my favorite season.\\\" }, \\\"polish\\\": { \\\"title\\\": \\\"My Favorite Season\\\", \\\"content\\\": \\\"Spring is my favorite season. After the cold winter, the weather becomes warm and comfortable, and it feels nice to take a deep breath of fresh air. Flowers begin to bloom and the trees grow green leaves again, painting the world with bright colors. I love to go outside and play with my friends in the park, where we chase butterflies, run along the grass, and listen to the gentle wind. The air in spring is clean and full of life. It seems like the whole world is waking up. Spring is also a season of new beginnings, because many animals have babies and start new families. I enjoy watching the colorful butterflies flutter by and hearing birds sing cheerful songs from the trees. Longer days give me more time for outdoor adventures after school. Compared with the other seasons, spring makes me feel happy, hopeful, and energetic. It fills me with curiosity about nature and a readiness to try new things. That is why spring is my favorite season.\\\" } }\", \"higglights\": \"{ \\\"highlights\\\": [ \\\"结构清晰：从天气、景物到情感的变化呈现主题\\\", \\\"用词朴素、表达自然，易于同学理解\\\", \\\"情感鲜明，春天带来快乐与活力的体验\\\" ] }\", \"corrects\": \"{ \\\"origin\\\": { \\\"title\\\": \\\"My Favorite Season\\\", \\\"content\\\": \\\"My favorite season is spring. In spring, the weather becomes warm and comfortable after the cold winter. Flowers start to bloom, and trees grow green leaves again. I love to go outside and play with my friends in the park. The air feels fresh and clean. Spring is also the season of new beginnings because many animals have babies. I enjoy seeing the colorful butterflies and hearing birds sing. Compared with other seasons, spring makes me feel happy and full of energy. That is why spring is my favorite season.\\\" }, \\\"corrected\\\": { \\\"title\\\": \\\"My Favorite Season\\\", \\\"content\\\": \\\"My favorite season is spring. In spring, the weather becomes warm and comfortable after the cold winter. Flowers start to bloom, and trees grow green leaves again. I love to go outside and play with my friends in the park. The air feels fresh and clean. Spring is also the season of new beginnings because many animals have babies. I enjoy seeing the colorful butterflies and hearing birds sing. Compared with other seasons, spring makes me feel happy and full of energy. That is why spring is my favorite season.\\\" }, \\\"proof\\\": \\\"Excellent\\\" }\", \"score\": \"{ \\\"language\\\": 4, \\\"structure\\\": 4, \\\"content\\\": 4, \\\"creativity\\\": 3, \\\"comment\\\": \\\"你写得很清楚，主题明确，春天的景象和感受写得很温暖。句子基本通顺，可以尝试用更多不同的句型和细节（颜色、声音、味道）让画面更丰富。继续努力，你会越来越棒！\\\" }\", \"statistic\": \"{ \\\"wordCount\\\": 93, \\\"relevance\\\": \\\"92%\\\" }\"}",
        "nodeDeltaMap": null,
        "runLog": null,
        "runStatus": 1,
        "extendMap": null,
        "delta": null
    },
    "errorDesc": null,
    "errorCodeName": null
}
```

出参格式相对复杂一点，首先是结果中取data字段，data取content字段，接下来是content字段的解析以及字段对应内容（暂定，后续可以调整）：
一键润色：polish
亮点挖掘：higglights
基础批改：corrects
综合评分：score
数据统计：statistic



