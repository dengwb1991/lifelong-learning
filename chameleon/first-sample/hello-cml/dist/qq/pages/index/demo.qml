<view class=" cml-base cml-view">
  
  <text class=" cml-base cml-text">{{message}}</text>
  <text class="class1  cml-base cml-text">{{message2}}</text>

  
  <view qq:if="{{showlist}}" class=" cml-base cml-view">
    <view qq:for="{{array}}" qq:for-index="idx" qq:for-item="itemName" qq:key="city" class=" cml-base cml-view">
      <text class=" cml-base cml-text"> {{idx}}: {{itemName.city}}</text>
    </view>
  </view>

  
  <view bindtap="_cmlEventProxy" data-eventtap="{{['changeShow']}}" class=" cml-base cml-view"><text class=" cml-base cml-text">切换展示</text></view>
</view>