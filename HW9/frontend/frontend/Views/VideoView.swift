//
//  VideoView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/23.
//

import SwiftUI
import UIKit
import youtube_ios_player_helper

struct YTWrapper: UIViewRepresentable{
    @Binding var videoKey: String
    
    func makeUIView(context: Context) -> YTPlayerView {
        let playerView = YTPlayerView()
        playerView.load(withVideoId: videoKey, playerVars: ["playsinline": 1])
        return playerView
    }
    
    func updateUIView(_ uiView: YTPlayerView, context: Context) {
        //
    }
}


struct VideoView: View {
    @EnvironmentObject var detailsVM: DetailsViewModel
//    @State var key: String = "1IlUBHvgY8Q"
    
    var body: some View {
        if detailsVM.hasVideo {
            YTWrapper(videoKey: $detailsVM.video.key)
                .frame(width: 350, height: 197)
        }
    }
}

