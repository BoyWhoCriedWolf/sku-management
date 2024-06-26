import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import React, { CSSProperties, PropsWithChildren } from "react";

type Props = {
	open?: boolean | Boolean;
	variant?: "linear" | "circular";
	style?: CSSProperties;
	label?: string;
	className?: string;
};

const LoaderContainer: React.FC<PropsWithChildren<Props>> = ({
	children,
	open = false,
	style = {},
	label = "Loading ...",
	variant = "circular",
	className = "",
}) => {
	return (
		<Box sx={{ position: "relative", ...style }}>
			{open ? (
				variant === "circular" ? (
					<Box
						sx={{
							zIndex: (theme) => theme?.zIndex?.drawer,
							position: "absolute",
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							backdropFilter: "blur(5px)",
						}}
					>
						<CircularProgress color="primary" />
						<Typography variant="h6" color="primary" sx={{ marginLeft: 5 }}>
							{`${label} `}
						</Typography>
					</Box>
				) : variant === "linear" ? (
					<LinearProgress color="primary" />
				) : null
			) : null}
			<Box sx={{ position: "relative", ...style }}>{children}</Box>
		</Box>
	);
};

export default LoaderContainer;
