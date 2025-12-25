import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import RenderHtmlCom from 'react-native-render-html';
import MarkdownIt from 'markdown-it'

const source = {
  html: `
   <img src="file:///Users/shanguan/home/project/huaxiafortune/imgs/1_zd@2x.png" />
<p style="color:#FF5733; background:linear-gradient(to right, #FFC300, #FF5733); font-size:18px;">第一行：橙红色渐变背景，橙色文字</p>
<p style="color:#33FF57; background:linear-gradient(to right, #33FFBD, #33FF57); font-size:22px;">第二行：翠绿色渐变背景，绿色文字</p>
<p style="color:#3357FF; background:linear-gradient(to right, #33BDFF, #3357FF); font-size:26px;">第三行：深蓝色渐变背景，蓝色文字</p>
<p style="color:#D833FF; background:linear-gradient(to right, #FF33BD, #D833FF); font-size:30px;">第四行：紫红色渐变背景，紫红色文字</p>
<p style="color:#FFFFFF; background:linear-gradient(to right, #FFC0CB, #FFFFFF); font-size:34px; text-align:center;">第五行：粉红色到白色渐变背景，白色文字（居中显示）</p>
`
};

// const markdownText = `**上证50** 2715.5043（<span style=\"color:green\">-0.04%</span>）
// **上证指数** 3380.0785（<span style=\"color:green\">-0.01%</span>）
// **沪深300** 3926.664（<span style=\"color:red\">+0.73%</span>） 
// **创业板指** 2048.4587（0%）\n**深证成指** 10249.1731（0%）
//  **科创50** 12.39（<span style=\"color:green\">-1.35%</span>）
// (数据截止至： 2025年05月21日 10时56分）\n更多指数行情，您可以直接回复指数名称或指数代码。
// `

const markdownText = `# Markdown 与 HTML 混合示例

## 基础语法
- &zwnj;**粗体**&zwnj; 和 *斜体* 的 Markdown 语法  
  '<b>HTML 粗体</b>' 和 '<i>HTML 斜体</i>'

- 任务列表：
  - [x] 支持 HTML
  - [ ] 需要安全过滤

## HTML 嵌入
<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
  <h3 style="color: blue;">这是 HTML 区块</h3>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
  </ul>
</div>

## 表格对比
| Markdown 表格 | HTML 表格         |
|---------------|-------------------|
| '| 内容 |'    | '<td>内容</td>'  |

<table style="width:100%">
  <tr>
    <th>HTML 表格</th>
    <th>对齐</th>
  </tr>
  <tr>
    <td>支持样式</td>
    <td align="center">居中</td>
  </tr>
</table>

## 注意事项
1. 部分平台会过滤 HTML（如 GitHub Flavored Markdown）  
2. 混合使用时需注意标签闭合，例如：  
   '<span style="color:red">红色文本</span>'
`

const RenderHtml = () => {
  const [html, setHtml] = useState({html: ''})
  const { width } = useWindowDimensions();
  useEffect(() => {
    const md = MarkdownIt({ html: true })
  const html = md.render(markdownText)
    setHtml({html})
    console.log(html)
  }, [])



  return (
       <RenderHtmlCom
        contentWidth={width}
        source={html}
    />
  );
}

export default RenderHtml