# ベースイメージとしてPythonの公式イメージを使用
FROM python:3.11-slim

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# 必要なPythonライブラリをインストールするためのrequirements.txtをコピー
COPY requirements.txt .

# OpenAI APIクライアントと他の依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコンテナにコピー
COPY . .

# APIキーを環境変数として設定 (セキュリティを考慮して管理すること)
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY="sk-WOjyOD8kzCGMIRrU4oTOd8_3juskS44m-XGhOCWnhuT3BlbkFJ77Kqt8oDKCpYCLC86h2-0xTjATr742mHLRf8ELRqoA"

# アプリケーションのエントリーポイントを指定
CMD ["python", "generate_image.py"]
