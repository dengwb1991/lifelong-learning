<view class="rich-text  cml-base cml-view">
  <text qq:for="{{richList}}" style="{{item.style}}" qq:key="{{index}}" bindtap="_cmlInline" data-eventtap="{{['clickText',index]}}" class=" cml-base cml-text">{{item.text}}</text>
</view>