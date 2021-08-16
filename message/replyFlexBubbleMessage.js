function replyFlexBubble(
  locations,
  location,
  pop12hTime,
  pop12hDescription,
  wdValue,
  tempDescription,
  confortDescription
) {
  return (replyBubble = {
    type: 'flex',
    altText: 'This is FlexMessage',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://i.imgur.com/Ex3Opfo.png',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'http://linecorp.com/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${locations.locationsName} ${location.locationName}`,
            weight: 'bold',
            size: 'xl',
            align: 'center',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: `${pop12hTime.startTime} ~ ${pop12hTime.endTime}`,
                size: 'md',
                color: '#999999',
                margin: 'md',
                flex: 0,
                align: 'center',
                weight: 'regular',
              },
              {
                type: 'separator',
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '天氣狀況',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'lg',
                    offsetEnd: 'none',
                  },
                  {
                    type: 'text',
                    text: wdValue.value,
                    weight: 'bold',
                    size: 'lg',
                    offsetEnd: 'xxl',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '溫度狀況',
                    size: 'lg',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: tempDescription,
                    offsetEnd: 'xxl',
                    weight: 'bold',
                    size: 'lg',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '降雨機率',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'lg',
                  },
                  {
                    type: 'text',
                    text: pop12hDescription,
                    offsetEnd: 'xxl',
                    weight: 'bold',
                    size: 'lg',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '舒適度',
                    size: 'lg',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: confortDescription,
                    offsetEnd: 'xxl',
                    size: 'lg',
                    weight: 'bold',
                  },
                ],
              },
              {
                type: 'separator',
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: '詳細內容',
              uri: 'https://www.cwb.gov.tw/V8/C/W/County/index.html',
            },
          },
          {
            type: 'spacer',
            size: 'sm',
          },
        ],
        flex: 0,
      },
    },
  });
}

module.exports = replyFlexBubble;